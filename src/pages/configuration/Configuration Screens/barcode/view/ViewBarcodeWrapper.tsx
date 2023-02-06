import React from "react";
import ConfigurationLayout from "src/pages/configuration/ConfigurationLayout";
import ViewBarcode from "./ViewBarcode";

type Props = {};

const ViewBarcodeWrapper = (props: Props) => {
  return (
    <ConfigurationLayout>
      <ViewBarcode />
    </ConfigurationLayout>
  );
};

export default ViewBarcodeWrapper;
