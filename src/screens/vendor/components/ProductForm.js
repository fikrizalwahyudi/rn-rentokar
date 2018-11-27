import React , { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {  Toast, ActivityIndicator, Left, Right, Switch, ListItem, Textarea,Thumbnail, Card, CardItem, Picker, Icon, Form, Container, Item, Input, Header, Body, Content, Title, Button, Text, Label } from 'native-base';
import { Field,reduxForm } from 'redux-form';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as utils from '../../utils/RenderInput';
import * as uploader from '../../utils/ImageUploader';
import * as dataServices from '../../../services/DataServices';
import * as _ from 'lodash';
import Loader from '../../utils/Loader';


const validate = values => {
    const error= {};
    // error.productName= '';
    // error.name= '';
    // var ema = values.productName;
    // var nm = values.name;
    // if(values.productName === undefined){
    //     ema = '';
    // }
    // if(values.name === undefined){
    //     nm = '';
    // }
    // if(ema.length < 8 && ema !== ''){
    //     error.productName= 'too short';
    // }
    // // if(!ema.includes('@') && ema !== ''){
    // //     error.productName= '@ not included';
    // // }
    
    // if(nm.length > 8){
    //     error.name= 'max 8 characters';
    // }
    return error;
};

class ProductForm extends Component {
    constructor(props){
        super(props);
        this.state={
            isReady: false,
            selected: undefined,
            uri: "https://facebook.github.io/react-native/docs/assets/favicon.png",
            listCategory: [],
            isDeposit:true,
            selectedCategory: undefined,
            isLoading:false
        };

        this.uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
        
        utils.renderInput = utils.renderInput.bind(this);
        utils.renderTextArea = utils.renderTextArea.bind(this);
        // this.setState()
        
        
        // console.log();
        // console.log(this.state.listCategory);
        
    }
    async componentWillMount() {
        dataServices.getCategory().then(snap=>{
            this.setState({listCategory:snap})
            this.setState({isReady: true});
           console.log("snapp ", snap)
        })
        // await Expo.Font.loadAsync({
        //     'Roboto': require('native-base/Fonts/Roboto.ttf'),
        //     'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        // });
        
    }
    

    onSwitchValue = ()=>{
        this.setState({isDeposit:true});
    }

    onValueChange(value: string) {
        console.log(value);
        if(value == "key0"){
            value = undefined;
        }
        this.setState({
          selectedCategory: value
        });
    }

    publish = values => {
        this.showLoader();
        var data = {
            productName:values.productName,
            productDescription:values.productDescription,
            catId:this.state.selectedCategory,
            subCatId:this.state.selectedCategory,
            price:values.price,
            depositValue:values.depositValue,
            stock:values.stock,
            city:values.city,
            address:values.address,
            latitude:'-6.21462',
            longitude:'106.84513',
            status:1,  //0 = draft , 1 = published
            image:[this.state.uri],
            coverImg:this.state.uri
        }

        console.log('submitting form', data)

        var check = _.some(data, _.isUndefined)
        console.log(check);
        if(!check){
            dataServices.createProduct(data).then((res)=>{
                this.hideLoader();
                this.props.navigation.navigate("Product");
            }).catch((err)=>{
                this.hideLoader();
            });
        }else{
            this.hideLoader();
            this.showToast("Data belum lengkap", "warning");
        }
        
       
    }

    draft = values => {
        this.showLoader();
        var data = {
            productName:values.productName,
            productDescription:values.productDescription,
            catId:this.state.selectedCategory,
            subCatId:this.state.selectedCategory,
            price:values.price,
            depositValue:values.depositValue,
            stock:values.stock,
            city:values.city,
            address:values.address,
            latitude:'-6.21462',
            longitude:'106.84513',
            status:0,  //0 = draft , 1 = published
            image:[this.state.uri],
            coverImg:this.state.uri
        }
        var check = _.some(data, _.isUndefined)
        console.log(check);
        if(!check){
            dataServices.createProduct(data).then((res)=>{
                this.hideLoader();
                this.props.navigation.navigate("Product");
            }).catch((err)=>{
                this.hideLoader();
            });
        }else{
            this.hideLoader();
            this.showToast("Data belum lengkap", "warning");
        }
    }

    showToast = (message,type) =>{
        Toast.show({
            text: message,
            buttonText: 'Okay',
            type:type
        })
    }
    

    onUpload(){
        
        console.log("this uri ", this.state.uri);
        var self = this;
        uploader.pickImageHandler().then((res)=>{
            // console.log("resultnya", res);
            // console.log("urinya", this.uri);
            // this.uri = res;
            self.showToast("Success Upload Image","success");
            self.setState({uri:res});
            
        }).catch((err)=>{
            self.showToast("Failed Upload Image","warning");
            console.log(err);
            
        })
    }

    showLoader = () => {
        this.setState({ isLoading: true });
    };

    hideLoader = () =>{
        this.setState({ isLoading: false });
    }
   
    render(){
        const { handleSubmit, reset } = this.props;
        // if (!this.state.isReady) {
        //     return (
        //       <ActivityIndicator
        //         animating={true}
        //         style={styles.indicator}
        //         size="large"
        //       />
        //     );
        //   }
        // if (!this.state.isReady) {
        //     return <Expo.AppLoading />;
        // }
        return (
            <Container style= {{ backgroundColor: "white"}}>
                <Loader loading={this.state.isLoading} />
                <Content padder>
                    <Card >
                        <CardItem header bordered>
                            <Text>Item Detail</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Row style={{alignSelf: 'center',}}>
                                    <TouchableOpacity onPress={this.onUpload.bind(this)} >
                                        <Thumbnail  square large source={{uri: this.state.uri}} />
                                    </TouchableOpacity>
                                    {/* <Thumbnail square large source={{uri: this.state.uri}} style={{marginLeft: 10}}/>
                                    <Thumbnail square large source={{uri: this.state.uri}} style={{marginLeft: 10}}/>
                                    <Thumbnail square large source={{uri: this.state.uri}} style={{marginLeft: 10}}/> */}
                                </Row>
                            </Body>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Field type="text" name="productName" label="Nama Product"  component={utils.renderInput} />
                                <Field type="textarea" name="productDescription" component={utils.renderTextArea} rowSpan={5} bordered placeholder="Product Description"  />
                            </Body>
                        </CardItem>
                        <CardItem bordered style={{marginTop: -10,}}>
                            <Body>
                                <Form style={{width:'100%'}}>
                                    <Picker
                                    mode="dropdown"
                                    placeholder="Select your SIM"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    style={{ width: undefined }}
                                    selectedValue={this.state.selectedCategory}
                                    onValueChange={this.onValueChange.bind(this)}
                                    >
                                        <Picker.Item label="Choose Category" value="key0" />
                                        {
                                            this.state.listCategory.map((e, key)=>{
                                                return(
                                                    <Picker.Item label={e.name} value={e._key} key={key}/>
                                                )
                                            })
                                        }
                                        {/* <Picker.Item label="ATM Card" value="key1" />
                                        <Picker.Item label="Debit Card" value="key2" />
                                        <Picker.Item label="Credit Card" value="key3" />
                                        <Picker.Item label="Net Banking" value="key4" /> */}
                                    </Picker>
                                    <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    placeholder="Select your SIM"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    style={{ width: undefined }}
                                    selectedValue={this.state.selectedCategory}
                                    onValueChange={this.onValueChange.bind(this)}
                                    enabled={false}
                                    >
                                        <Picker.Item label="Choose Sub Category" value="key0" />
                                        <Picker.Item label="ATM Card" value="key1" />
                                        <Picker.Item label="Debit Card" value="key2" />
                                        <Picker.Item label="Credit Card" value="key3" />
                                        <Picker.Item label="Net Banking" value="key4" />
                                    </Picker>
                                </Form>
                            </Body>
                        </CardItem>
                        <CardItem header bordered >
                            <Text>Alamat</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Field name="city" label="Kota"  component={utils.renderInput} />
                                <Field name="address" type="textarea" label="Alamat"  placeholder="Detail Address" component={utils.renderInput} />
                            </Body>
                        </CardItem>
                        <CardItem header bordered >
                            <Text>Harga</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Field name="price" label="Harga/hari"  component={utils.renderInput} />
                                <ListItem  noIndent style={{ width:'100%'}}>
                                    <Left style={{marginLeft: -15,}}>
                                        <Text>Deposit</Text>
                                    </Left>
                                    <Right>
                                        <Switch value={this.state.isDeposit}  />
                                    </Right>
                                </ListItem>
                                <Field name="depositValue" label="Harga Jaminan"  component={utils.renderInput} />
                                <Field name="stock" label="Stock"  component={utils.renderInput} />
                            </Body>
                        </CardItem>
                        <Row style={{alignSelf: 'center',}}>
                            <Button style= {{ margin: 10, width:'40%' }} block primary onPress= {handleSubmit(this.draft)}>
                                <Text>Draft</Text>
                            </Button>
                            <Button style= {{ margin: 10, width:'40%' }} block primary onPress= {handleSubmit(this.publish)}>
                                <Text>Publish</Text>
                            </Button>
                        </Row>
                        
                    </Card>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    indicator: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 80
    }
  });

export default reduxForm({
    form: 'test',
    validate
})(ProductForm)