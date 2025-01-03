


import React from 'react'
import { Text, View, TextInput, StyleSheet, TextStyle, StyleProp, KeyboardTypeOptions } from 'react-native'
import { colors } from '@/theme/theme'


interface Props {
    styles?: StyleProp<TextStyle>,
    placeholder: string,
    onChange?: () => void,
    value?: any,
    type: KeyboardTypeOptions,
    isArea?: boolean,
    isPassword?: boolean

}
export const InputCustom = ({ styles, placeholder, onChange, value, type, isArea = false, isPassword = false }: Props) => {




    return (
        <View>
            <TextInput
                onChangeText={onChange}
                autoCapitalize='none'
                value={value}
                multiline={isArea}
                secureTextEntry={isPassword ? true : false}
                numberOfLines={isArea ? 10 : 0}
                placeholder={placeholder}
                style={[styles, style.inputContainer]}
                keyboardType={type}
                autoComplete='email'


            />

        </View>
    )
}


const style = StyleSheet.create({
    inputContainer: {
        padding: 20,
        fontSize: 24,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.complementary

    }
})