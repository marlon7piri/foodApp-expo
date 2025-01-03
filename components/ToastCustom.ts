import Toast from 'react-native-toast-message'




export function sendMessage(message: string, submessage: string, tipo: 'success' | 'error' | 'info') {
    return Toast.show({
        type: tipo,
        text1: message,
        text2: submessage,
        visibilityTime: 1000
    })
}



