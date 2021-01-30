export const helperRequestCount = (incommingValue, requestCount) => {
	if ((incommingValue + requestCount) / 10 > 1) {
		// ex
		// incommingValue = 33
		// requestCount = 4
		// fractionValue = 3.7
		// arr = ['3', '.', '7']
		// newRequestCount = 7
		let fractionValue = incommingValue + requestCount / 10;
		let arr = fractionValue.toString().split("");
		let newRequestCount = parseInt(arr[arr.length - 1]);
		return {
			newRequestCount,
			totalRequests: Math.abs(incommingValue) + requestCount
		};
	} else if (Math.abs(incommingValue) + requestCount === 10) {
		return {
			newRequestCount: 0,
			totalRequests: 10
		};
	}
	return {
		newRequestCount: requestCount + incommingValue,
		totalRequests: requestCount + Math.abs(incommingValue)
	};
};
