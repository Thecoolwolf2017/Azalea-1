import*as r from"@minecraft/server";import{Database as t}from"./db";import m from"./lz-string";import{formatStr as o}from"./utils/AzaleaFormatting";export const defaultNicknameFormat="§8[<rank>§r§8] §7<name>\\n§2<hp>§7/§a<hp_max>";export function NicknamesModule(){new t("Config");r.system.runInterval((()=>{}),80)}