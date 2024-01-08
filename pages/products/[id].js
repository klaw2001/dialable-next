import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductDetails from "../product-details";

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/api/products/single-product/${id}`)
    .then((res)=>{
      console.log(res)
      setProduct(res.data.data);
    })
  },[])
    
  
    return <ProductDetails productId={product} />;
  };
  
  export default ProductPage;