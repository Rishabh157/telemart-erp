export const getOptions = ({ data, keyName, value }: { data: any, keyName: string, value: string }) => {
  return data?.map((ele: any) => {
    return {
      label: ele[keyName],
      value: ele[value]
    }
  })
}



