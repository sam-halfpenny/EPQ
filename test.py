import wav2rgb
import imageio
import time
sf=300
ef=850
im=[]
for i in range(sf,ef):
    im.append([])
    for j in range(100):
        rgb=wav2rgb.wav2rgb(wav2rgb.createSpectra([i],[j+1],[2]))
        im[i-sf].append(rgb)
imageio.imwrite("C:/Users/sam05/OneDrive/Desktop/CODE/github-repositorys/sandbox/raymarching/test"+str(time.time())+".png",im)
