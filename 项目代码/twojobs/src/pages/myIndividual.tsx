import React, { useEffect } from 'react'
import {Select} from 'antd'
import {getLocale,setLocale,useIntl} from 'umi'
const myIndividual:React.FC=()=>{
    // const enLanguage: {[key: string]: string} = {
    //     'en': 'en-US',
    //     'en-US': 'en-US',
    // }
    // useEffect(() => {
    //     let language = navigator.language;
    //     if (language){
    //         setLocale(enLanguage[language], false);
    //     }
    // }, [])
    const intl=useIntl()
    return <div>
        <Select value={getLocale()} onChange={value=>setLocale(value,false)}>
            <Select.Option value='zh-CN'>中文</Select.Option>
            <Select.Option value='ko-KR'>Englnd</Select.Option>
        </Select>
        <h1>{intl.formatMessage({
            id:'header.status'
        })}</h1>
    </div>
}
export default myIndividual