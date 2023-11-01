const mumbaiCardAddress = "0xd668E3E58746aa0629140Fd2550BE9232170df83";
const mumbaiCardAbi = require("./mumbaiCardAbi.json");
const mumbaiPaperCardId = "ff166561-282d-4508-b977-06f700995cfb";
const mumbaiUSDCAddress = "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23";
const mumbaiUSDCAbi = require("./mumbaiUSDCAbi.json");
const mumbaiRPC = "https://polygon-mumbai.g.alchemy.com/v2/IoNI81VrslYowc3cPFLcntqivvok3AkD";
const mumbaiAlchemyApiKey = "IoNI81VrslYowc3cPFLcntqivvok3AkD";

const polygonCardAddress = "0xb85A03D7FcAc3d254C4e4419c776Fab3f1E7523B";
const polygonCardAbi = require("./polygonCardAbi.json");
const polygonPaperCardId = "51a9d934-e4af-4160-be75-9f884483992a";
const polygonUSDCAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
const polygonUSDCAbi = require("./polygonUSDCAbi.json");
const polygonRPC = "https://polygon-mainnet.g.alchemy.com/v2/w1jm8yaxFLd3sjA_RbdRDujeWzUEwoSO";
const polygonAlchemyApiKey = "w1jm8yaxFLd3sjA_RbdRDujeWzUEwoSO";

// const network = config.NODE_ENV == "development" ? "mumbai" : "polygon";
const network = "polygon";
const cardAddress = network == "mumbai" ? mumbaiCardAddress : polygonCardAddress;
const cardAbi = network == "mumbai" ? mumbaiCardAbi : polygonCardAbi;
const paperCardId = network == "mumbai" ? mumbaiPaperCardId : polygonPaperCardId; 
const USDCAbi = network == "mumbai" ? mumbaiUSDCAbi : polygonUSDCAbi;
const USDCAddress = network == "mumbai" ? mumbaiUSDCAddress : polygonUSDCAddress;
const RPC = network == "mumbai" ? mumbaiRPC : polygonRPC;
const AlchemyApiKey = network == "mumbai" ? mumbaiAlchemyApiKey : polygonAlchemyApiKey;

const collectFactoryAbi = require("./collectFactoryAbi.json");
const collectFactoryAddress = "0x82B11bF46131f5d812a92b14b7373D889De2061D";
const collectContractAbi = require("./collectContractAbi.json");

module.exports = {
    network,
    cardAddress,
    cardAbi,
    collectFactoryAbi,
    collectFactoryAddress,
    collectContractAbi,
    paperCardId,
    USDCAbi,
    USDCAddress,
    RPC,
    AlchemyApiKey,
}