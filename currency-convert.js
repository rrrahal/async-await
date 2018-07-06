// http://data.fixer.io/api/latest?access_key=bdbfc53af7612742e45b593edda74a82&format=1

const axios = require('axios');

const getExchangeRate = async (from, to) => {
	try {
		const response = await axios.get(
			'http://data.fixer.io/api/latest?access_key=bdbfc53af7612742e45b593edda74a82&format=1'
		);
		const euro = 1 / response.data.rates[from];
		const rate = euro * response.data.rates[to];

		if (isNaN(rate)) {
			throw new Error();
		}

		return rate;
	} catch (e) {
		throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
	}
};

const getCountries = async (currencyCode) => {
	try {
		const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
		return response.data.map((country) => country.name);
	} catch (e) {
		throw new Error(`Unable to get countries that use ${currencyCode}`);
	}
};

const convertCurrency = (from, to, amount) => {
	let convertedAmount;
	return getExchangeRate(from, to)
		.then((rate) => {
			convertedAmount = (rate * amount).toFixed(2);
			return getCountries(to);
		})
		.then((countries) => {
			return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the folowing countries ${countries.join(
				','
			)}`;
		});
};

const convertCurrencyAlt = async (from, to, amount) => {
	const rate = await getExchangeRate(from, to);
	let convertedAmount = (rate * amount).toFixed(2);
	const countries = await getCountries(to);
	return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the folowing countries ${countries.join(
		','
	)}`;
};

convertCurrencyAlt('USD', 'CAD', 20)
	.then((message) => {
		console.log(message);
	})
	.catch((e) => {
		console.log(e.message);
	});

const add = async (a, b) => a + b;

const doWork = async () => {
	try {
		const result = await add(12, 13);
		return result;
	} catch (e) {
		return 10;
	}
};

doWork()
	.then((data) => {
		console.log(data);
	})
	.catch((e) => {
		console.log('something went wrong', e);
	});
