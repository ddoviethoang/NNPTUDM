//cau1
function Product(id, name, price, quantity, category, isAvailable) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
  this.category = category;
  this.isAvailable = isAvailable;
}

//cau2
let products = [
  new Product(1, "iPhone 15", 35000000, 5, "Phone", true),
  new Product(2, "Samsung S24", 28000000, 0, "Phone", true),
  new Product(3, "MacBook Pro", 45000000, 3, "Laptop", true),
  new Product(4, "AirPods Pro", 6500000, 10, "Accessories", true),
  new Product(5, "Apple Watch", 12000000, 0, "Accessories", false),
  new Product(6, "Dell XPS", 32000000, 6, "Laptop", true)
];

//cau3
let namePriceList = products.map(function (p) {
  return {
    name: p.name,
    price: p.price
  };
});

console.log("Câu 3:", namePriceList);
//cau4
let inStockProducts = products.filter(function (p) {
  return p.quantity > 0;
});

console.log("Câu 4:", inStockProducts);
//cau5
let hasProductOver30M = products.some(function (p) {
  return p.price > 30000000;
});

console.log("Câu 5:", hasProductOver30M);
//cau6
let accessoriesAvailable = products
  .filter(function (p) {
    return p.category === "Accessories";
  })
  .every(function (p) {
    return p.isAvailable === true;
  });

console.log("Câu 6:", accessoriesAvailable);
//cau7
let totalInventoryValue = products.reduce(function (total, p) {
  return total + p.price * p.quantity;
}, 0);

console.log("Câu 7 - Tổng giá trị kho:", totalInventoryValue);
//cau8
console.log("Câu 8:");
for (let p of products) {
  let status = p.isAvailable ? "Đang bán" : "Ngừng bán";
  console.log(p.name + " - " + p.category + " - " + status);
}
//cau9
console.log("Câu 9:");
let sampleProduct = products[0];

for (let key in sampleProduct) {
  console.log(key + ": " + sampleProduct[key]);
}

//cau10
let sellingAndInStockProducts = products
  .filter(function (p) {
    return p.isAvailable === true && p.quantity > 0;
  })
  .map(function (p) {
    return p.name;
  });

console.log("Câu 10:", sellingAndInStockProducts);
