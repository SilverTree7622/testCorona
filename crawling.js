
// crawling test
const axios = require("axios");
const cheerio = require("cheerio");
const referList = [
	'https://www.mohw.go.kr/react/popup_200128.html',
	'https://www.mohw.go.kr/react/popup_200128_3.html',
	'https://www.mohw.go.kr/react/popup_200128_4.html',
	'https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json'
];
let htmlList = [];
const getHtml = async (_URL) => {
	console.log('_URL:', _URL);
	try {
		if (_URL) {
			return await axios.get(_URL);
		}
	}
	catch (error) {
		console.error(error);
	}
};
const _then = (html) => {
	if (html) {
		const $ = cheerio.load(html.data);
		htmlList.push(html.data);
		console.log('htmlList:', htmlList);
	}
	else {
		console.log('where the fuck is html?? :', html);
	}
}

// // get all the html elements from referList URL
// for (let i=0; i<referList.length; i++) {
//     getHtml(referList[i]).then(html => _then(html));
// }

for (let i=0; i<referList.length; i++) {
    getHtml(referList[i]).then(html => _then(html));
}

module.exports = () => {
    // get all the html elements from referList URL
    console.log('htmlList:', htmlList);
    return htmlList;
}