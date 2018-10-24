import React , { Component } from 'react';
import { View } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Label } from 'native-base';
import { Field,reduxForm } from 'redux-form';
const validate = values => {
  const error= {};
  error.email= '';
  error.name= '';
  var ema = values.email;
  var nm = values.name;
  if(values.email === undefined){
    ema = '';
  }
  if(values.name === undefined){
    nm = '';
  }
  if(ema.length < 8 && ema !== ''){
    error.email= 'too short';
  }
  if(!ema.includes('@') && ema !== ''){
    error.email= '@ not included';
  }
  if(nm.length > 8){
    error.name= 'max 8 characters';
  }
  return error;
};
class OrderForm extends Component {
  constructor(props){
    super(props);
    this.state={
      isReady: false
    };
    this.renderInput = this.renderInput.bind(this);
  }
  async componentWillMount() {
      this.setState({isReady: true});
    }

  renderInput({ input, label, type, meta: { touched, error, warning } }){
    var hasError= false;
    if(error !== undefined){
      hasError= true;
    }
    console.log("input", input)
    console.log("label", label)
    console.log("type", type)
    return( 
      <Item floatingLabel error= {hasError}>
        <Label> {label} </Label>
        <Input {...input} keyboardType = {(type == 'number') ? 'numeric' : 'default'}/>
        {hasError ? <Text>{error}</Text> : <Text />}
      </Item>
    )
  }
  render(){
    const { handleSubmit, reset } = this.props;
    
    return (
        <Content padder>
            <Field name="qty" label="Jumlah" type="number" component={this.renderInput} />
            <Field name="price" label="Harga" type="number" component={this.renderInput} />
            <Field name="deposit" label="Deposit" type="number" component={this.renderInput} />
            <Field name="total" label="Total" type="number" component={this.renderInput} />
            <Button block primary onPress= {reset} style={{marginTop: 10}}>
                <Text>Submit</Text>
            </Button>
        </Content>
    )
  }
}
export default reduxForm({
  form: 'orderForm',
  validate
})(OrderForm)