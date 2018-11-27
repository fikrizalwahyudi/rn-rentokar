import React , { Component } from 'react';
import { View } from 'react-native';
import { Container, Textarea, Item, Input, Header, Body, Content, Title, Button, Text, Label } from 'native-base';

export const renderInput = ({ placeholder, input, label, type, meta: { touched, error, warning } }) => {
    var hasError= false;
    if(error !== undefined){
        hasError= true;
    }
   
    return( 
        <Item style= {{ marginTop: 0,marginBottom: 10, }} error= {hasError}  floatingLabel>
            <Label>{label} {hasError ? <Text style={{alignItems: 'flex-end', color:'red'}}>{error}</Text> : <Text />}</Label>
            <Input {...input}/>
        </Item> 
    )
    
}

export const renderTextArea = ({ placeholder, input, label, type, meta: { touched, error, warning } }) => {
    var hasError= false;
    if(error !== undefined){
        hasError= true;
    }
    
    return(
        <Textarea style={{width:'100%'}} rowSpan={5} bordered placeholder={placeholder} {...input}/>
    )

}