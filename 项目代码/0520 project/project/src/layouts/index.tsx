
import { FC } from 'react';
import { IRouteComponentProps } from 'umi'
import Teacherslayout from './teacherslayout'
const Index:FC<IRouteComponentProps>=(props)=> {
    if(/\/teachers/.test(props.location.pathname)){
        return <Teacherslayout>
            { props.children }
        </Teacherslayout>
    }
    return props.children
  }
export default Index

