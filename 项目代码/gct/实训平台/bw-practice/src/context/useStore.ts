import { useContext } from "react";
// 引入StoreContext
import StoreContext from "@/context/storeContext"

export default()=>{
    return useContext(StoreContext);
} 