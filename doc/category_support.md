Category Header Support
----------------

Based off of [migg24's Typeahead fork](https://github.com/migg24/typeahead.js)

This release of Typeahead supports categories and headers within the dropdown results. It also will dynamically pin the category header to the top of the dropdown as the user scrolls.

The data structure for this can vary depending on the matching function you use/create.

Example Data Structure
----------------
```
var itemsAndSubItems = [
	{value:'Humans', category:'Bipeds'},
	{value:'Gibbons', category:'Bipeds'},
	{value:'Otriches', category:'Bipeds'},
	{value:'Buffalo', category:'Quadrupeds'},
	{value:'Rabbits', category:'Quadrupeds'},
	{value:'Horses', category:'Quadrupeds'},
	{value:'Cats', category:'Quadrupeds'},
	{value:'Wallabies', category:'Macropodae'},
	{value:'Kangaroos', category:'Macropodae'},
];
```

Example Initialization
-----------------
```
$('#example-input').typeahead({
	hint: true,
	highlight: true,
	minLength: 0
},{
	name: 'items',
	displayKey: 'value',
	displayCategory: 'category',
	source: substringMatcher(itemsAndSubItems)
});
```

Example Matching Function
-----------------
```
var substringMatcher = function(items) {
	return function findMatches(q, callback) {
		var matches, substringRegex;
		matches = [];
		substrRegex = new RegExp(q, 'i');
		$.each(items, function(i, item) {
			if (substrRegex.test(item.value)) {
				matches.push(item);
			}
		});
		callback(matches);
	};
};
```

Example Style for Category Header Support
------------------
```
* { font-family: sans-serif; }
label { display: block; font-weight: bold; color: #505050; margin: 3px; }
input { border: 1px solid #ddd; border-radius: 2px; height: 20px; width: 250px; text-indent: 4px; }
small { color: #c1c1c1; }
@-ms-viewport {
	width: device-width;
}
.tt-hint {
    color: #999999;
}
.tt-dropdown-menu {
    background-color: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0 0 4px 4px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    margin-top: 0px;
    padding: 0 0 4px 0;
    width: 100%;
	max-height: 150px;
	overflow-y: auto;
	overflow-x: hidden;
}
.tt-suggestion {
	font-size: 14px;
	padding: 5px;
	cursor: pointer;
	border-bottom:1px solid #d4d3d5;
}
.tt-suggestion.tt-cursor {
    background-color: #0097CF;
    color: #FFFFFF;
}
.tt-suggestion p {
    margin: 0;
}
.tt-suggestion-category {
	background-color:#444444;
	padding:5px;
	font-size:10px;
	color:#f1eff2;
	margin:0px;
}
.tt-suggestion-category p {
	margin:0px;
}
```