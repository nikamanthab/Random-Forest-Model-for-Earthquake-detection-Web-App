import sys
import pickle
import numpy as np

osaka   =[1,  1,  1,  0,  0,  0,  0,  0]
winnipeg  =[1,  0,  0,  1,  1,  0,  0,  0] 
chennai =[0,  0,  0,  0,  0,  0,  0,  0]
honolulu =[1,  1,  1,  0,  0,  1,  0,  0]

if sys.argv[13] == 'Osaka':
	inputArr = [[sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5],sys.argv[6],sys.argv[7],sys.argv[8],
			sys.argv[9],sys.argv[10],sys.argv[12],sys.argv[12]] + osaka]
elif sys.argv[13] == 'Winnipeg':
	inputArr = [[sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5],sys.argv[6],sys.argv[7],sys.argv[8],
			sys.argv[9],sys.argv[10],sys.argv[12],sys.argv[12]] + winnipeg]
elif sys.argv[13] == 'Chennai':
	inputArr = [[sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5],sys.argv[6],sys.argv[7],sys.argv[8],
			sys.argv[9],sys.argv[10],sys.argv[12],sys.argv[12]] + chennai]
elif sys.argv[13] == 'Honolulu':
	inputArr = [[sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5],sys.argv[6],sys.argv[7],sys.argv[8],
			sys.argv[9],sys.argv[10],sys.argv[12],sys.argv[12]] + honolulu]

loaded_model = pickle.load(open('./FINAL_MODEL.sav', 'rb'))
pred = loaded_model.predict(inputArr)
print(pred)