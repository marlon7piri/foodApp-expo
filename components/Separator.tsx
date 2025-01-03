import React, { Component } from 'react'
import { Text, View } from 'react-native'


interface Props{
  height?:number
}
export const Separator =({height=10}:Props)=> {
 
    return (
      <View style={{height:height}}/>
    )
 
}
