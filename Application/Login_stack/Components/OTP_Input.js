import React, { useRef, useState, useEffect } from "react";
import { View, TextInput, Pressable } from 'react-native';
import Colors from "../../../Config/Colors";
import { RFValue } from "react-native-responsive-fontsize";

const OTPInputField = ( {setPinReady, code, setCode, maxLength}) => {
    
    const handleOnPress= () => {
        setInputContainerIsFocused(true);
        textInputRef?.current?.focus();
    };
    const textInputRef = useRef(null);
    const handleOnBlur = () => {
        setInputContainerIsFocused(false);
    };

    useEffect(() => {
        setPinReady(code.length === maxLength);
        return () => setPinReady(false);
    }, [code]);

    const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);

    const codeDigitsArray = new Array(maxLength).fill(0);
    const toCodeDigitInput = (_value, index) => {
        const emptyInputChar = " ";
        const digit = code[index] || emptyInputChar;
    
        const isCurrentDigit = index === code.length;
        const isLastDigit = index === maxLength -1;
        const isCodeFull = code.length === maxLength;

        const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);


    return(
        <View
        style={{
            borderColor: Colors.lightgray,
            minWidth: '17%',
            height: RFValue(60),
            borderWidth: 2,
            borderRadius: 10,
            padding: 12,
            marginVertical: 20,
            marginHorizontal: 5,
            alignItems: 'center',
            justifyContent: 'center'
        }}
        key={index}>
        <TextInput style={{
            fontSize: 30,
            textAlign: "center",
        }}
        edtitable={false}>{digit}</TextInput>
        </View>

    );
}
    
    return (

        <View style={{
            justifyContent: "center",
            alignItems: "center",
        }}>
        <Pressable style={{
            // width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            marginLeft: 20
        }}
        onPress={handleOnPress}>{codeDigitsArray.map(toCodeDigitInput)}
        </Pressable>
        <TextInput style={{
            position: "absolute",
            width:1,
            height: 1,
            opacity: 0,
           }}
           keyboardType= 'numeric'
           value={code}
           onChangeText={setCode}
           maxLength={maxLength}
           returnKeyType="done"
           textContentType="oneTimeCode"
           ref={textInputRef}
           onBlur={(handleOnBlur)}
           autoFocus={true}>
        </TextInput>
        </View>
        
    );

};

export default OTPInputField;