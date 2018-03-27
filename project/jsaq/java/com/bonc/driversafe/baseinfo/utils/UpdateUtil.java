package com.bonc.driversafe.baseinfo.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class UpdateUtil {

	public static Object reflect(Object a, Object b) {

		Class<? extends Object> clazz = a.getClass();
		Field[] fields = clazz.getDeclaredFields();//获取所有属性
		Field.setAccessible(fields, true);
		for (Field field : fields) {
			try {
				String name = field.getName();
				String string = toUpCase(name);
				//获取属性的setter方法
				Method method = clazz.getDeclaredMethod("set" + string, field.getType());
				if (field.get(a) != null) {
					method.invoke(b, field.get(a));
				}
			} catch (Exception e) {
				e.getMessage();
			}
		}
		return b;

	}

	/**
	 * 字符串首字母大写
	 * 
	 * @param str
	 * @return
	 */
	public static String toUpCase(String str) {

		String case1 = str.substring(0, 1).toUpperCase();
		String string = str.substring(1);
		str = case1 + string;
		return str;

	}

}
