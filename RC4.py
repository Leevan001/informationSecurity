# -*- coding = utf-8 -*-
# @Time : 2023/1/16 14:11
# @Author : CQU20205644
# @File : RC4.py
# @Software : PyCharm


# Bravo小组遇到了一个棘手的问题：
# U.C.研究生招生部门的官员Chris在需求讨论会中曾指出，在Rec.OES4UC子系统提供招生服务的环节中，需要每个面试小组的考生以某种随机的序列先后进入线上会议室参加面试。Chris还指出，抽签的方式虽然能够达成目标，但效率较低。希望Bravo能够设计一种算法来快速解决。
# 提示：假设事先通过某种键值(如考号)可对n个考生排序得到一个序列(即某个考场的每个考生有一个自然数序列的连续编号)，现在还需要使用一种伪随机数生成的方法，通过一个Seed(可以由系统生成)来进一步打乱学生序列，生成伪随机的考生入场序列。
# (2) 任务说明
# 请You同学认真思考RC4算法，并尝试将其进行剪裁、修改和使用，从而达成上述目标。请You同学用伪代码和文字说明对算法进行阐述。

import random

def init_S(key,num):
    key_length = len(key)
    S = [x for x in range(1,num+1)]  # [0,1,2, ... , 255]
    j = 0
    for i in range(num):
        j = (j + S[i] + key[i % key_length]) % num
        S[i], S[j] = S[j], S[i]  # swap values

    return S


def PRGA(S,num):
    i = 0
    j = 0
    count=0
    round=random.randint(10, 20)
    while count<round:
        i = (i + 1) % num
        j = (j + S[i]) % num
        S[i], S[j] = S[j], S[i]  # swap values
        count=count+1
    return S

def generate_random_str(randomlength=16):
  """
  生成一个指定长度的随机字符串
  """
  random_str =''
  base_str ='ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789'
  length =len(base_str) -1
  for i in range(randomlength):
    random_str +=base_str[random.randint(0, length)]
  return random_str

def get_order(num):
    key=generate_random_str(16)
    key = [ord(c) for c in key]
    S = init_S(key,num)
    return PRGA(S,num)

if __name__ == '__main__':
    dic = dict()
    for i in range(11):
        dic[i] = 0
    count=0
    while count<100000:
        a=get_order(10)
        dic[a[0]]=dic[a[0]]+1
        count+=1
    print(dic)
