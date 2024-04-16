import { useEffect, useState } from 'react'
import { SelectOption } from '../models/FormField/FormField.model'
import { QueryStatus } from '@reduxjs/toolkit/query';
import { getOptions } from 'src/utils/getOptionBydata';
// Define the type for the useEndPointHook
type UseEndPointHook = {
    data?: any;
    isLoading: boolean;
    isFetching: boolean;
    error?: any;
    status: QueryStatus;
};

export const useCustomOptions = ({ useEndPointHook, keyName, value }: { useEndPointHook: UseEndPointHook, keyName: string, value: string }) => {
    const [options, setOptions] = useState<SelectOption[]>([])
    const { data, isLoading, isFetching } = useEndPointHook

    useEffect(() => {
        if (!isFetching && !isLoading) {
            let options = getOptions({
                data: data?.data,
                keyName: keyName,
                value: value
            })
            setOptions(options)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, isLoading, isFetching])

    return { options, isOptionsLoading: isLoading }
}
