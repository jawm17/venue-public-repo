import React from "react";
import "./styles/topSupportersDemoStyle.css";

export default function TopSupportersDemo() {

    return (
        <div id="supportersOuter">
            <div>
            <div id="supportersLabel">
                Top Supporters
            </div>
            <div id="supportersGrouping">
                <img className="supporter" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX///8AAAB9fX3Dw8Onp6czMzMSEhLn5+eSkpLi4uI/Pz/6+vrt7e2Wlpbz8/OkpKTb29vLy8uLi4vS0tIdHR1ra2tfX1+rq6u5ubm8vLxcXFxVVVXw8PCxsbFkZGQ9PT1KSkpwcHBNTU0WFhYiIiJ4eHgqKio0NDSUlJQLCwtY+GazAAAHj0lEQVR4nO2c6XriOgyGgZQlbIEAZemwtQOd3v8NnsayE8tWIHAMdnj0/hoMdPTFjjY7NBoMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzDMw5ks01ZvO/RtxqMYp03JZ+zbloewbmq8+bbmAbw1ESPf9jhn1jTY+rbINW3QNd8c+1LixLdJbomEqK9p9u/4r3jR9m2TW3ZC1Fi+Or+gt8HepQvr1KdBromFoiIKJuJ14tEi16zNOZu/2iSKYNjXBlZC4dSbQc4R+dpGHxEKF77scY9Q+G6N5M61/tgK4xdLbITvPKChfTb04cWaR7DN5JzREASMgSeDnDOz7zqI+pEvi1wzJILDdzbU8mSQe+Z2DpO+Vvq9yOQc0VD0WvFilKn5i4bGr5XWTIk89OeluhlDoqw/vlbiRqQwib1y68xnJidFQ9FrVVCpnbdBatr1Ys4DWNlJ2qDIaobr0WLT7+9Tqxlen2hCZTV76Uwj1WDMCpBiTofL3W+i0Gmn63psdOBelOAENdV7EyEzn0GqjS3qoPFolfmNpag4PpsG4kMrY3DlxeibWNqec2Jqkxzk9UCEnxqA58QxXxPQb42St51aqDtLYB36AcJM3Oeem/dZ3Eai+svpLEqVHwrerQqHskNDJ2n7hz30y1l53glcid7zbL2PxL4R1Z6iHvXPSqBWHA/EXk5HvfzzaFPvBPwKcvtyUxF52K1SqA9CafKbDoy3H9m/9r0gw4ewEnn9sXQsxJixnqWv6RVrOETf2rcNp7bZ9pQC4VzfD7obwh2DIBB1Pk5Nd/a8ym640YVLmjbhzWJsWz6yV6m6EXEObh0DMB1UGIhgd9JHIkKhFIN7xX9yWd/LSSxT9QDW6WS2jrS5EOvvS/9ATCw3aBV3GhglUAbFT+IqPJ3pRhrVUquJ6HzrVqOxPh5TBYhq68Cl8dqom+SRu5knZQPbLNH4xs0NemsxNe5OosX8XEaGUwBbztaMEZ1iussI++SH/PVRrI4HWF6RluX3DlmqdcJWNuTUGAqFGzG3bGBZLvH/4E9hkXp0Co2RCgS6f1gR85WN2U1G8dUiI/WrUAWvXnbXzPJaL7EOnTSEB9mb35+2iGC+wpfCr0KIVn11wSeq6NsSqWkjrnq+LV7pn/SqEKbwUxtRq3byQbjO+/CqkDhmIddtZ2dqvxuvCqnN3UHesGi6aeT7VAhxfW2MDjWFLqpXnwpjWoVWHbhItnwqnFpBD8jbE06SLZ8KoxKFjbxNf7Lfuxn/q3RGvKM6hWbdcA9efalQsaPeUX0WB3WdV4UtmcDYqErdwSMzXhXGMoEh3gIv5GIjyW9eugAdVGuaaj3dhefqCRIY8kTXvswN3YhnhfJpgw3x1mBPbLEMds1zoXo5R5Pcav6YCVLDu0J1v5FVxMRO2sSyVqn6FN+poi6xO6Ob0r//JJKbXMpcz+WMxkafdszfrpKjuzmVO1Qb0etQnRmhsGi1ifLZfoBItKuI1ftEoND/qRTckcIeThhohURj8ukMoAlV6aw6UjjCX6MVgi/zvHEhA3+VHSKkMMGpK61w4ir7+1/IB38rBD+k8A3HUlqhKMXmriy9GyiXKtiBFArji34prVDcrAc3Zv4foJa4HpeRQjgNlb9HK9x4DviKPxVDBlIYVVEoPrM0Rz0A83H1kQOkcFpB4fqGYPtgRAv4au5xs0KxQWpuovpBNhGvHNhCCmfXFU4qx6EnAAnqlR33WxUexUdCOTR0rnDLIIVGMCcUwsII5jkGuK0OFz+DFMZ4XRMKF+H4GQGcMbj4GB5S2MVL0FYIkxzQw5mwpi46PqQQPp8n1bbCdmBTqJK3SxEDKYSje3nD0VIIf47sx/picDViIIUNPEWmQnkmNRRHCiyv+b4bFMoOUGg/OAERo/woOqEwr7mwQplBHB5k6N3IvcOPsqVVXSFcq7P5B/wju+Bli4tQmLdgkMIL3XTPSGfzW2aQTh4rFK/yNpquEG7ooAJFTvF4DNXF7aBZEwfz806raIxCJShvwhDKQor8qNu8pIGdL71j9qqLvgezBi2DAM7NllCcx7Qkdv/qM5NtbRQ37Djf6NiG6mUKRqUSGzFqDHbxK5krwHfD/kHC4WepxOtApfnPuVGOSe6X+CVuYvcmuWZ5r0QoG2vwoOXdEsHPPMQk11SVaGxKiKIpoLL3EkripX2V7nHebKMcT/QlA+hyV0JKvDAhskb61i5CO+R0xkJKLN2V6qrAWRy2DWFL9BaWl/Ov4gH2PB03ehvhk17yjNovDuc7pbVTSDwymzP4gRlu6nde7RQazRgErNFU1pTyM+MLXwiTclcjD9o2Gv/gH1BV1c3TXJhD7SFZaP3+QGowr0vSphDGv596aW80SjK2SfKW/Gt9g0DRCVBBo/W2iiIhN5ANtSroDycQyGRgao4H1em+DPnkck7+rNe27I3wKfvhFn0GM9b4HRdn4J/FhhaXgTaaYvQrA7X6qcxV2mq1TovF7n3Xl+w/dseRdd5w1nvff311vjeLtE7hkGEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYpn78B1koQzSfbR7gAAAAAElFTkSuQmCC"/>
                <img className="supporter" src="https://pbs.twimg.com/profile_images/1384626298421751812/DkLr-gnD_400x400.jpg"/>
                <img className="supporter" src="https://pbs.twimg.com/profile_images/1568303021053943808/FMJam7TT_400x400.jpg"/>
                <img className="supporter" id="supporter4" src="https://pbs.twimg.com/profile_images/1637872935347036161/PxFqWY4D_400x400.jpg"/>
                <img className="supporter" src="https://pbs.twimg.com/profile_images/1436503855861276680/8qzEXb9B_400x400.jpg"/>
                <div id="supporterLabel">
                    amanda <mark className="gradientTextSmall">$46</mark>
                </div>
            </div>
            </div>
        </div>
    );
}