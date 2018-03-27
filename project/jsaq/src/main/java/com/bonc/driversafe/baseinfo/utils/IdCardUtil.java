package com.bonc.driversafe.baseinfo.utils;

import org.apache.commons.lang3.StringUtils;

/**
 * 身份证校验工具类 简单的校验：校验前17位是否为纯数字，最后一位校验码是否正确
 * 
 * @author Administrator
 *
 */
public class IdCardUtil {

	/**
	 *  校验身份证号格式是否合法
	 * @param idCard
	 * @return boolean
	 */
	public static boolean checkIdCard(String idCard) {
		//String[] checkCode = new String[] { "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2" };
		if (idCard.length() == 15) {
			return true;
		}
		if (idCard.length() != 18) {
			return false;
		}
		// 身份证校验码校验系数
		int[] quotiety = new int[] { 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 };
		// 获取前17位
		String prefix17 = idCard.substring(0, 17);
		if (prefix17 == null || StringUtils.isBlank(prefix17) ? false : prefix17.matches("^[0-9]*$")) {
			// 判断最后的验证码是否有效
			int sum = 0;
			char[] arr = prefix17.toCharArray();
			for (int i = 0; i < arr.length; i++) {
				int k = Integer.parseInt(arr[i] + "");
				int j = quotiety[i];
				int temp = k * j;
				sum += temp;
			}
			if (getCheckCode(String.valueOf(sum % 11)).equals(idCard.substring(17, 18))) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 根据性别判断
	 * 
	 * @param idCard
	 * @param gender
	 * @return boolean
	 */
	public static boolean checkGender(String idCard, String gender) {
		String genderNum = idCard.substring(16, 17);
		if (genderNum.equals(gender)) {
			return true;
		}
		return false;
	}
	
	/**
	 * 获取校验码
	 * @param mod
	 * @return 校验码
	 */
	public static String getCheckCode(String mod) {
		int[] modArr = new int[] { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
		String[] checkCode = new String[] { "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2" };
		int intMod = Integer.parseInt(mod);
		for (int i = 0; i < modArr.length; i++) {
			if (intMod == modArr[i]) {
				return checkCode[i];
			}
		}
		return "$";
	}
	/**
	 * 验证手机号的正确性
	 * @param Tel
	 * @return boolean
	 */
	public static boolean CheckTel(String tel) {
		if (tel.length() != 11) {
			return false;
		}
		if (tel == null || StringUtils.isBlank(tel) ? false : tel.matches("^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[013678])|(18[0,5-9]))\\d{8}$")) {
			return true;
		}
		return false;
	}
	
	
}
