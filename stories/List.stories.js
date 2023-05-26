import React from "react";
import { List } from "../components/List";

const theList = ["Walk my dog","Buy some Groceries","Go to the gym","go to the dentist", "get some rest"]

export default {
    title:"Example/List",
    component:List,
    args:{
        variant:"ordered",
        items: theList
    }
}

export const Basic =()=> {<List/>};

export const OrderedList ={
    args:{
        variant:"ordered",
        items:theList
    }
}

export const UnorderedList ={
    args:{
        variant:"unordered",
        items:theList
    }
}