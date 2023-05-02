import { v4 as uuidv4 } from "uuid";

const add_all = "ADD_ALL";
const add_one = "ADD_ONE";
const remove_one = "REMOVE_ONE";
const remove_all = "REMOVE_ALL";

export const addReducer = (state = { products: [], add_id: true }, action) => {
  if (action.type === add_all) {
    const { ele, clicked } = action.payload;
    if (state.add_id === true) {
      state.products = [...state.products, { ...ele, add_id: clicked.add_id }];
    } else {
      state.products = [...state.products, { ...ele, add_id: uuidv4() }];
    }
    state.add_id = false;

    console.log(state);
    return state;
  }
  if (action.type === add_one) {
    const { ele, elem, clicked } = action.payload;
    if (state.products === []) {
      if (state.add_id === true) {
        state.products = [
          {
            add_id: clicked.add_id,
            id: ele.id,
            title: ele.title,
            img: ele.img,
            variants: [elem],
          },
        ];
      } else {
        state.products = [
          {
            add_id: uuidv4(),
            id: ele.id,
            title: ele.title,
            img: ele.img,
            variants: [elem],
          },
        ];
      }
      state.add_id = false;

      return state;
    } else {
      let a = state.products.findIndex((item) => item.id === ele.id);
      console.log(a);
      if (a >= 0) {
        const products = state.products.map((item) => {
          if (item.id === ele.id) {
            return { ...item, variants: [...item.variants, elem] };
          }
          return item;
        });
        state.products = products;
      } else {
        state.products = [
          ...state.products,
          {
            add_id: uuidv4(),
            id: ele.id,
            title: ele.title,
            img: ele.img,
            variants: [elem],
          },
        ];
      }

      console.log(state);
      return state;
    }
  }
  if (action.type === remove_all) {
    const { ele } = action.payload;
    const filter = state.products.filter((elem) => elem.id !== ele.id);
    state.products = filter;

    console.log(state);
    return state;
  }
  if (action.type === remove_one) {
    const { ele, elem } = action.payload;
    const element = state.products.filter((item) => item.id === ele.id)[0];
    console.log(element);
    const variants = element.variants.filter((item) => item.id !== elem.id);
    console.log(variants);
    if (variants.length === 0) {
      let tempArr = state.products.filter((item) => item.id !== ele.id);
      state.products = tempArr;
    } else {
      const products = state.products.map((item) => {
        if (item.id === ele.id) {
          return { ...item, variants: variants };
        }
        return item;
      });
      state.products = products;
    }
    console.log(state);
    return state;
  }
  if (action.type === "cancel") {
    state.products = [];
    state.add_id = true;
    return state;
  }
};
