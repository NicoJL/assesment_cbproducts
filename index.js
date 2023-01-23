const exist_elements = [
	{ name: 'BOOK', category: 'books', tax: false, imported: false },
	{ name: 'MUSIC CD', category: 'music', tax: true, imported: false },
	{ name: 'CHOCOLATE BAR', category: 'food', tax: false, imported: false },
	{ name: 'IMPORTED BOX OF CHOCOLATES', category: 'food', tax: false, imported: true },
	{ name: 'IMPORTED BOTTLE OF PERFUME', category: 'other', tax: true, imported: true },
	{ name: 'BOTTLE OF PERFUME', category: 'other', tax: true, imported: false },
	{ name: 'PACKET OF HEADACHE PILLS', category: 'medical', tax: false, imported: false },
	{ name: 'IMPORTED BOXES OF CHOCOLATES', category: 'food', tax: false, imported: true },
	{ name: 'IMPORTED TV', category: 'other', tax: true, imported: true },
	{ name: 'TV', category: 'other', tax: true, imported: false },
	{ name: 'BEER', category: 'other', tax: true, imported: false },
	{ name: 'IMPORTED BEER', category: 'other', tax: true, imported: true },
	{ name: 'COOKIES', category: 'other', tax: false, imported: false }
];

var total = 0,
	tax = 0;

roundNumber = (value) => {
	let num = parseFloat(value);

	return Math.round(num * 100) / 100;
}

clear = () => {
	total = 0;
	tax = 0;
	document.getElementById('pTax').innerHTML = '';
	document.getElementById('pTotal').innerHTML = '';
	document.getElementById('divInfo').innerHTML = '';
	document.getElementById('txtProduct').value = '';
}

sendProduct = (value) => {
	let aux_product = value.split(' ');
	// quantity.
	let aux_quantity = aux_product.shift();
	if (parseInt(aux_quantity) > 0) {
		let aux_price = aux_product[aux_product.length - 1];
		let aux_name = '';

		for(var x = 0 ; x < aux_product.length - 2; x++) {
			aux_name += aux_product[x] + ' ';
		}

		let aux_find = exist_elements.findIndex(x => x.name === aux_name.toUpperCase().trim());

		if (aux_find >= 0) {
			let aux_tax = 0;
			let aux_import = 0;

			if (exist_elements[aux_find].tax) {
				aux_tax = parseFloat(aux_price * aux_quantity) * 0.10;
				aux_tax = roundNumber(aux_tax);
			} 

			if (exist_elements[aux_find].imported) {
				aux_import = parseFloat(aux_price * aux_quantity) * 0.05;
				aux_import = roundNumber(aux_import);

			} 

			let aux_total = (aux_price * aux_quantity) + aux_tax + aux_import;
			total += aux_total;
			tax += aux_tax + aux_import;

			drawTotals(aux_quantity,aux_name,roundNumber(aux_total));
		} else {
			alert('This product is not exists');
		}
	} else {
		alert('This is an invalid quantity');
	}
	
}

drawTotals = (quantity,product,product_total) => {
	var div = document.getElementById('divInfo');
	var product_info = document.createElement('p');

	product_info.innerHTML = `${quantity} ${product}: ${product_total}`;
	div.append(product_info);

	// Totals.
	var tax_info = document.getElementById('pTax');
	tax_info.innerHTML = `Sales Taxes: ${roundNumber(tax)}`;
	var total_info = document.getElementById('pTotal');
	total_info.innerHTML = `Total: ${roundNumber(total)}`;
}


window.addEventListener("DOMContentLoaded",function(){
	document.getElementById('btnSend').addEventListener('click',function (e) {
		e.preventDefault();
		let prod = document.getElementById('txtProduct');
		sendProduct(prod.value);
		prod.value = '';
	})

	document.getElementById('btnClear').addEventListener('click',function (e) {
		e.preventDefault();
		clear();
	});
});