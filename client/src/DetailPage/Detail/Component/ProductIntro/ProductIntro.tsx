import React, { useEffect, useState } from "react";
import "./ProductIntro.scss";
import axios from "axios";
import { ItemIdProps } from "../../../../Interfaces/PropsInterfaces";

interface ProductIntroData {
  content: string;
}

function ProductIntro({ itemId }: ItemIdProps) {
  /**
   * ProductIntro Data
   */
  const [productIntroData, setProductIntroData] = useState<ProductIntroData>();

  /**
   * ProductIntro API
   */
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/detail/${itemId}/product-intro`)
      .then((response) => {
        setProductIntroData(response.data.data);

        //console.log("product", response.data.data)
      })
      .catch((error) => {
        console.log("연결 실패");
      });
  }, [itemId]);

  return (
    <div className="product-introduction">
      <div dangerouslySetInnerHTML={{ __html: productIntroData?.content ?? "" }}></div>
    </div>
  );
}

export default ProductIntro;
