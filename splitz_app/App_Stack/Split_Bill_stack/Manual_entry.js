import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import RNPickerSelect from 'react-native-picker-select';

import { AntDesign } from '@expo/vector-icons';

import Screen from '../../../Components/Screen';
import Back_button from '../../../Components/Back_button';
import Colors from '../../../Config/Colors';
import { scale } from 'react-native-size-matters';
import Large_green_button from '../../../Components/Large_green_button';

const ManualEntry = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { participants } = route.params;

    const nameInputRef = useRef(null);
    const quantityInputRef = useRef(null);
    const taxInputRef = useRef(null);

    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('1');
    const [itemPrice, setItemPrice] = useState('');
    10
    const [tax, setTax] = useState('');
    const [tip, setTip] = useState('');
    const [total, setTotal] = useState('');

    const formatInput = (text) => {
        return text.replace(/[^0-9.]/g, '')
                   .replace(/(\..*)\./g, '$1')
                   .replace(/(\.\d{2})\d+/g, '$1');
    };

    const quantities = Array.from({ length: 20 }, (_, i) => `${i + 1}`);

    useEffect(()=> {
            const subtotal = items.reduce((item_value, item) => item_value + (item.quantity * item.price), 0);
            const totalTax = parseFloat(tax) || 0;
            const totalTip = parseFloat(tip) || 0;
            const totalValue = subtotal + totalTax + totalTip;
            setTotal(totalValue.toFixed(2));
    }, [items, tax, tip])

    const deleteItem = (index) => {
        setItems(currentItems => currentItems.filter((_, i) => i !== index));
    };

    const addItem = () => {
        if (!itemName.trim() || !itemQuantity.trim() || !itemPrice.trim()) return;
        const newItem = {
            name: itemName.trim(),
            quantity: itemQuantity.trim(),
            price: itemPrice.trim(),
        };
        setItems([...items, newItem]);
        setItemName('');
        setItemQuantity('1');
        setItemPrice('');
        nameInputRef.current.focus()
    };

    return (
        <Screen>
            <Back_button title={'Back'} onPress={() => navigation.goBack()} />
            <KeyboardAvoidingView
            behavior='height'
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            style={{flex: 1}}
            >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={[styles.input, {flex: 3}]}
                        placeholder="Item Name"
                        placeholderTextColor={Colors.textInputPlaceholder}
                        keyboardType='default'
                        value={itemName}
                        onChangeText={setItemName}
                        autoFocus={true}
                        ref={nameInputRef}
                        returnKeyType='next'
                        onSubmitEditing={()=> quantityInputRef.current.focus()}
                        />
                    {/* <TouchableOpacity style={[styles.input, {flex: 1}]}>
                        <RNPickerSelect
                            onValueChange={(value) => setItemQuantity(value)}
                            items={[
                                { label: '2', value: '2' },
                                { label: '3', value: '3' },
                                { label: '4', value: '4' },
                            ]}
                            style={{borderWidth: 1}}
                            placeholder={{ label: "1", value: '1', color:Colors.black }}
                        />
                    </TouchableOpacity> */}

                    <TextInput 
                        style={[styles.input, {flex: .5}]}
                        ref={quantityInputRef}
                        placeholder="Quantity"
                        placeholderTextColor={Colors.textInputPlaceholder}
                        keyboardType="numeric"
                        value={itemQuantity}
                        onChangeText={setItemQuantity}
                        />
                    {/* <View style={[styles.input, {flex: 1, justifyContent: 'center'}]}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {quantities.map((qty, index) => (
                                <TouchableOpacity key={index} style={styles.quantityButton} onPress={() => setItemQuantity(qty)}>
                                    <Text style={styles.quantityText}>{qty}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View> */}
                    <TextInput 
                        style={[styles.input, {flex: 2}]}
                        placeholder="Price"
                        placeholderTextColor={Colors.textInputPlaceholder}
                        keyboardType="numeric"
                        value={itemPrice}
                        onChangeText={ (text) => setItemPrice(formatInput(text))}
                        />
                    <TouchableOpacity style={styles.addButton} onPress={addItem}>
                        <AntDesign name="pluscircleo" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={[styles.input, {flex: 1}]}
                        placeholder="Tax Amount"
                        keyboardType='numeric'
                        placeholderTextColor={Colors.textInputPlaceholder}
                        value={tax}
                        onChangeText={(text) => setTax(formatInput(text))}
                        returnKeyType='next'
                        onSubmitEditing={()=> taxInputRef.current.focus()}
                        />
                    <TextInput 
                        style={[styles.input, {flex: 1}]}
                        ref={taxInputRef}
                        placeholder="Tip Amount"
                        placeholderTextColor={Colors.textInputPlaceholder}
                        keyboardType="numeric"
                        value={tip}
                        onChangeText={(text) => setTip(formatInput(text))}
                        />
                </View>
                {items.length !== 0 ? (
                    <FlatList
                    data={items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.listItem}>
                            <Text style={[styles.itemText, {flex: 1.5}]}>{item.name}</Text>
                            <Text style={[styles.itemText, {flex: 1}]}>({item.quantity})</Text>
                            <Text style={[styles.itemText, {flex: 1}]}>${item.price}</Text>
                            <TouchableOpacity style={{position: 'absolute', right: scale(10)}}activeOpacity={.5} onPress={() => deleteItem(index)}>
                                    <AntDesign name="closecircle" size={scale(16)} color="gray" />
                            </TouchableOpacity>
                        </View>
                    )}
                    style={{marginTop: scale(15), marginBottom: scale(100)}}
                    />
                ) : (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: scale(20)}}>
                        <Text style={{textAlign: 'center', fontFamily: 'DMSans_700Bold', fontSize: RFValue(16), color: Colors.primary, paddingBottom: scale(100)}}>
                            Add items to get started and we'll calculate the total for you!
                        </Text>
                    </View>
                )}
                    {tax && tip ? (
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.tax_tip_text}>Tax and Tip included</Text>
                        <Text style={styles.totalText}>Total: ${total}</Text>
                    </View>
                    ) : tax ? (
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.tax_tip_text}>Tax included</Text>
                        <Text style={styles.totalText}>Total: ${total}</Text>
                    </View>
                    ): tip ? (
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.tax_tip_text}>Tip included</Text>
                        <Text style={styles.totalText}>Total: ${total}</Text>
                    </View>
                    ):(
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.totalText}>Total: ${total}</Text>
                    </View>
                    )}
                <Large_green_button title={'Next'} onPress={()=>navigation.navigate('Manual_splitting', {participants, items, tax, tip, total})} disabled={items.length === 0}/>
            </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: scale(10),
    },
    input: {
        borderBottomWidth: 1,
        padding: 10,
        margin: scale(5),
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(12)
    },
    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: scale(5)
    },
    listItem: {
        padding: scale(10),
        marginVertical: scale(5),
        marginHorizontal: scale(25),
        backgroundColor: '#f0f0f0',
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        color: 'black',
        fontFamily: 'DMSans_500Medium',
        fontSize: RFValue(14),
    },
    totalText: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(16),
        color: Colors.primary,
        textAlign: 'center',
        position: 'absolute',
        bottom: scale(65),
    },
    tax_tip_text: {
        fontFamily: 'DMSans_700Bold',
        fontSize: RFValue(10),
        color: Colors.primary,
        position: 'absolute',
        left: scale(25),
        bottom: scale(65),
    }
});

export default ManualEntry;
