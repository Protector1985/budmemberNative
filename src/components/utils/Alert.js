import {Text, StyleSheet, Platform, View, TouchableOpacity} from 'react-native';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';

export default function Alert({callBack, visible, type, message, setVisible, navigation, location}) {
  
    function handlePress() {
        switch(type) {
          case "SUCCESS":
            callBack ? callBack() : null
            return navigation.navigate(location), setVisible(false);
          case "ERROR":
            return setVisible(false);
          case "WARNING":
            return setVisible(false);
        }
    }
  
  function returnIconStyle() {
      switch(type) {
        case "SUCCESS":
          return styles.success;
        case "ERROR":
          return styles.error;
        case "WARNING":
          return styles.warning
      }
    }

    function btnColor() {
      switch(type) {
        case "SUCCESS":
          return '#14A44D';
        case "ERROR":
          return '#DC4C64';
        case "WARNING":
          return '#E4A11B';
      }
    }

    function iconName() {
      switch(type) {
        case "SUCCESS":
          return "checkmark";
        case "ERROR":
          return 'ios-close';
        case "WARNING":
          return 'exclamation';
      }
    }

    function returnIcon() {
      switch(type) {
        case "SUCCESS":
          return <Ionicons
            name={iconName()}
            size={36}
            color="#FFFFFF"
          />;
        case "ERROR":
          return <Ionicons
            name={iconName()}
            size={36}
            color="#FFFFFF"
          />;
        case "WARNING":
          return <AntDesign 
            name="exclamation" 
            size={36}
            color="#FFFFFF" />
      }
    }

    return (
        <FancyAlert
            style={styles.alert}
            icon={
            <View style={[returnIconStyle(), { borderRadius: 32 } ]}>
              {returnIcon()}
            </View>
            }
            onRequestClose={() => console.log("closing")}
            visible={visible}
        >
    <View style={styles.content}>
      <Text style={styles.contentText}>{message}</Text>

      <TouchableOpacity style={[styles.btn,{backgroundColor: btnColor()}]} onPress={handlePress}>
        <Text style={styles.btnText}>OK</Text>
      </TouchableOpacity>
    </View>
  </FancyAlert>
    )
}

const styles = StyleSheet.create({
    alert: {
      backgroundColor: '#EEEEEE',
    },
    error: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#DC4C64',
      width: '100%',
    },
    success: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#14A44D',
        width: '100%',
      },
    warning: {
      flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E4A11B',
        width: '100%',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -16,
      marginBottom: 16,
    },
    contentText: {
      textAlign: 'center',
    },
    btn: {
      borderRadius: 32,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 8,
      alignSelf: 'stretch',
      marginTop: 16,
      minWidth: '50%',
      paddingHorizontal: 16,
    },
    btnText: {
      color: '#FFFFFF',
    },
  });