import { FlatList, StyleSheet, Text, TouchableOpacity, View, LayoutAnimation, Platform, UIManager } from 'react-native';
import React, { useState } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Haptics from 'expo-haptics';


import Colors from '../../../../Config/Colors';
import { Medium500Text } from '../../../../Config/AppText';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

const User_total_list_item = ({ name, price, first_letter, items, tax_tip }) => {
  const [expanded, setExpanded] = useState(false);

  const truncate = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
  };

  const handleExpand = () => {
    Haptics.selectionAsync();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={.8} onPress={handleExpand} style={styles.innerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.icon}>
            <Text style={styles.icon_letter}>{first_letter}</Text>
          </View>
          <Text style={styles.name}>{truncate(name, 15)}</Text>
        </View>
        <Text style={styles.price}>{price}</Text>
      </TouchableOpacity>
      {expanded && 
        <View style={styles.expandedContainer}>
          <FlatList 
            data={items}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Medium500Text style={styles.itemName}>{item.item_name}</Medium500Text>
                {/* <Medium500Text style={styles.itemQuantity}>Qty: {item.item_quantity}</Medium500Text> */}
                <Medium500Text style={styles.itemCost}>${item.pricePerUser}</Medium500Text>
              </View>
            )}
            ListFooterComponent={() => (
                <View style={styles.itemContainer}>
                <Medium500Text style={styles.itemName}>Proportional Tax and Tip</Medium500Text>
                <Medium500Text style={styles.itemCost}>${tax_tip}</Medium500Text>
              </View>
            )}
          />
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: scale(15),
    marginVertical: verticalScale(3),
    width: '100%',
  },
  innerContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 1
  },
  name: {
    fontFamily: 'DMSans_500Medium',
    fontSize: RFValue(14),
  },
  price: {
    fontFamily: 'DMSans_500Medium',
    fontSize: RFValue(22),
  },
  icon: {
    borderWidth: 2,
    borderColor: Colors.primary,
    height: scale(30),
    width: scale(30),
    borderRadius: scale(15),
    marginRight: scale(10),
    backgroundColor: Colors.backgroundFillGray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon_letter: {
    fontFamily: 'DMSans_700Bold',
    fontSize: RFValue(20),
    color: '#959595'
  },
  expandedContainer: {
    padding: scale(10),
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(5),
    paddingHorizontal: '5%'
  },
  itemName: {
    fontSize: RFValue(12),
    color: Colors.textgray,
  },
  itemQuantity: {
    fontSize: RFValue(12),
    color: Colors.textgray,
  },
  itemCost: {
    fontSize: RFValue(12),
    color: Colors.textgray,
  },
});

export default User_total_list_item;
