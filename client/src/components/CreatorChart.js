import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js';
import axios from "axios";
// import 'chartjs-plugin-zoom';

export default function MainChart(props) {
    const [transactions, setTransactions] = useState([]);
    const [weeklyTotals, setWeeklyTotals] = useState([]);
    let realData;

    useEffect(() => {
        if(props.refreshChart > 0) {
            getUserTransactions();
        }
    }, [props.refreshChart])

    useEffect(() => {
        if (props.creatorId) {
            getUserTransactions();
        }
    }, [props.creatorId]);

    useEffect(() => {
        if (weeklyTotals) {
            initCharts();
        }
    }, [weeklyTotals]);

    function calculateWeeklyTotals(transactions) {

        // Assuming you have the user's ID
        const userId = 'user_id';

        // Calculate the start and end dates for the 6-week period
        const currentDate = new Date();
        const startDate = new Date(currentDate.getTime() - (5 * 7 * 24 * 60 * 60 * 1000)); // 6 weeks ago
        const endDate = currentDate;

        // Generate an array with 6 consecutive week numbers
        const weekNumbers = Array.from({ length: 6 }, (_, index) => getWeekNumber(addWeeks(startDate, index)));

        // Group transactions by week and calculate total amount per week
        const weeklyTotals = transactions.reduce((totals, transaction) => {
            const transactionDate = new Date(transaction.createdAt);
            if (
                transaction.to._id === props.creatorId &&
                transactionDate >= startDate &&
                transactionDate <= endDate
            ) {
                const weekNumber = getWeekNumber(transactionDate);
                if (!totals[weekNumber]) {
                    totals[weekNumber] = 0;
                }
                totals[weekNumber] += transaction.amount;
            }
            return totals;
        }, {});

        // Fill in missing weeks with total amount of 0
        weekNumbers.forEach(weekNumber => {
            if (!weeklyTotals[weekNumber]) {
                weeklyTotals[weekNumber] = 0;
            }
        });

        // Sort the weekly totals by week number
        const sortedWeeklyTotals = weekNumbers.map(weekNumber => [weekNumber, weeklyTotals[weekNumber]]);
        setWeeklyTotals(sortedWeeklyTotals);

        // Helper function to get the week number from a date
        function getWeekNumber(date) {
            const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
            const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
            const weekNumber = Math.floor((date - firstDayOfYear) / millisecondsPerWeek);
            return weekNumber;
        }

        // Helper function to add weeks to a date
        function addWeeks(date, weeks) {
            const result = new Date(date);
            result.setDate(result.getDate() + weeks * 7);
            return result;
        }

    }

    async function getUserTransactions() {
        try {
    
            const { data } = await axios.post("/tx/get-all-txs", { userID: props.creatorId });
            // setTransactions(data.txs.reverse());
            calculateWeeklyTotals(data.txs.reverse())
        } catch (error) {

        }
    }


    function getData(platform) {
        if (platform === "uniswap") {
            return [120, 190, 300, 340, 280, 410];
        }
    }

    function initCharts() {
        realData = weeklyTotals;
        const data = weeklyTotals.map(([_, totalAmount]) => totalAmount);
        const labels = weeklyTotals.map(([weekNumber]) => `Week ${weekNumber}`);
        var ctx = document.getElementById('myChart').getContext('2d');

        let maxAmount = 100
        const anyNonZeroValue = data.some((value) => value !== 0);
        if (anyNonZeroValue) {
            maxAmount = Math.max(...Object.values(data)) * 2;
        }

        // Get the current date
        var currentDate = new Date();

        // Create an empty array to store the dates
        var datesArray = [];

        // Loop 6 times to populate the array with dates
        for (var i = 0; i < 6; i++) {
            // Get the date string in the desired format "6/7/2021"
            var dateString = (currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();

            // Add the date string to the array
            datesArray.push(dateString);

            // Subtract 7 days from the current date
            currentDate.setDate(currentDate.getDate() - 7);
        }

        datesArray.reverse();


        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: datesArray,
                datasets: [{
                    label: '$ earned',
                    data: data,
                    backgroundColor: [
                        'rgba(0, 252, 0, 0.4)',
                        'rgba(0, 252, 0, 0.4)',
                        'rgba(0, 252, 0, 0.4)',
                        'rgba(0, 252, 0, 0.4)',
                        'rgba(0, 252, 0, 0.4)',
                        'rgba(0, 252, 0, 0.4)',
                    ],
                    borderColor: [
                        '#00fc00',
                        '#00fc00',
                        '#00fc00',
                        '#00fc00',
                        '#00fc00',
                        '#00fc00',
                    ],
                    borderWidth: 1
                }]
            },
            options: {

                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                scales: {
                    xAxes: [{
                        display: false, // Hide x-axis labels
                        offset: true,
                    }],
                    yAxes: [{
                        display: false, // Hide y-axis labels
                        offset: true,
                        ticks: {
                            max: maxAmount, // Set the maximum height to 100 (adjust the value according to your needs)
                        },
                    }]
                },
                legend: {
                    display: false
                },
            }
        });
    }

    return null;
}