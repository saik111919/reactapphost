import{r as e,f,g as i}from"./index-Bb9cCbD0.js";const u=()=>{const[o,r]=e.useState([]),[a,c]=f(!1),t=e.useCallback(async()=>{a(!0);try{const s=await i(),{data:n}=s;r(n)}catch(s){console.error("Failed to fetch transactions:",s)}finally{a(!1)}},[a]);return e.useEffect(()=>{t()},[t]),{data:o,LoaderComp:c,setLoader:a,fetchTransactions:t}};export{u};
