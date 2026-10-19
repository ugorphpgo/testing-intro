const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

const ids = (result) => result.map((product) => product.id);

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]",()=>{
    expect(ids(sortProductsByPrice(products.slice(),'asc'))).toEqual([3,6,5,4,2,1]);
  });
  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]',()=>{
    expect(ids(sortProductsByPrice(products.slice()))).toEqual([3,6,5,4,2,1]);
  });
  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]",()=>{
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    expect(ids(sortProductsByPrice(subset,'asc'))).toEqual([3,4,1]);
  });
  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]",()=>{
    expect(ids(sortProductsByPrice(products.slice(),'desc'))).toEqual([1, 2, 4, 5, 6, 3]);
  });
  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]",()=>{
    const subset = products.filter(({ id }) => [3, 1, 4].includes(id));
    expect(ids(sortProductsByPrice(subset,'desc'))).toEqual([1,4,3]);
  });
  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]",()=>{
    const subset = products.filter(({ id }) => [5, 2, 6].includes(id));
    expect(ids(sortProductsByPrice(subset,'desc'))).toEqual([2,5,6]);
  });
  test("'asc' не меняет исходный массив [1, 3, 4]", () =>{
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    const before = subset.map((p) => p.id).slice();
    sortProductsByPrice(subset, 'asc');
    expect(subset.map((p) => p.id)).toEqual(before);
  });
  test("'desc' не меняет исходный массив [1, 3, 4]", () =>{
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    const before = subset.map((p) => p.id).slice();
    sortProductsByPrice(subset, 'desc');
    expect(subset.map((p) => p.id)).toEqual(before);
  });
  test('направление по умолчанию не меняет исходный массив всех товаров',() =>{
    const before = ids(products).slice();
    sortProductsByPrice(products);
    expect(ids(products)).toEqual(before)
  })
});
