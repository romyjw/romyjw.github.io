import numpy as np
import pygame
import time as tm

import matplotlib.pyplot as plt
pi=np.pi




W=500
H=500
pygame.init()
screen=pygame.display.set_mode((W,H))
surface1=pygame.Surface((W,H))#canvas
surface2=pygame.Surface((W,H))#circles
surface3=pygame.Surface((W,H))#copy drawing
surface4=pygame.Surface((W,H))#copy drawing

while True:
	drawing=True
	screen=pygame.display.set_mode((2*W,H))
	surface1=pygame.Surface((W,H))
	surface4=pygame.Surface((W,H))#copy drawing

	started=False
	mousedown=False
	points=[]
	cpoints=[]
	dpoints=[]
	while mousedown or (not started):

		
		for event in pygame.event.get():
			if event.type==pygame.QUIT:
				pygame.quit()
			if event.type==pygame.MOUSEBUTTONDOWN:
				mousedown=True
				started=True
			if event.type==pygame.MOUSEBUTTONUP:
				mousedown=False
			if event.type==pygame.MOUSEMOTION and mousedown:
				mousepos=pygame.mouse.get_pos()
				x,y=(mousepos[0]-W//2)*2/W,(mousepos[1]-H//2)*2/H #linear transform to make nicer scale
				points.append((x,y))
				dpoints.append((x*W/2+W//2,y*H/2+H//2))#non shifted
				cpoints.append(x+y*1j)
		if len(points)>=2:
			pygame.draw.lines(surface1,((255,100,0)),False,dpoints,width=1)
		screen.blit(surface1,(0,0))
		pygame.display.update()	
		
	#join up to start/close the loop			
	points.append(points[0])
	cpoints.append(cpoints[0])
	dpoints.append(dpoints[0])

	pygame.draw.lines(surface1,((255,100,0)),False,dpoints,width=1)
	screen.blit(surface1,(0,0))
	pygame.display.update()	

	#wait for key press
	waiting=True		
	while waiting:
			
		for event in pygame.event.get():
			if event.type==pygame.QUIT:
				pygame.quit()
			if event.type==pygame.KEYDOWN:
				waiting=False





	x=cpoints

	N=len(x)
	print(N)
	t=np.arange(0,N)

	X=[]

	for k in range (0,N):#0 to N-1 inclusive
		Xk=0
		for n in range (0,N):
			Xk+=x[n]*np.exp(-2*pi*1j*k*n/N)
		X.append(Xk)
	Xi=np.arange(0,N)
	
	n_epi=1
	
	while drawing:	
		n_epi*=2
		if n_epi>=N:
			n_epi=2
		#get epicycles - biggest ones
		
		mags=np.abs(X)
		epis=[]
		
		for i in range (0,n_epi):
			k=np.where(mags==max(mags))[0]
			mags[k]=0
			epis.append(k)
			

		pointlist=[]

		for time in np.arange(0,N+1):#not actually time, yet. 0 to N. To ensure joining up.
			surface2=pygame.Surface((W,H))
			if time%2==0:
				col=((0,100,255))
			else:
				col=((255,255,255))
			head=0
			for epi in epis:#epicycles
				k=epi[0]
				
				if X[k]!=0:
					complex_increment=X[k]*np.exp(2*pi*1j*k*time/N)*1/N
					head+=complex_increment
					
					xpos=np.real((W/2)*np.real(head)+W//2)
					ypos=np.real((H/2)*np.imag(head)+H//2)
					mag=np.abs(X[k]/N)
					norm=(X[k]/N)/mag
					
					
					dhead=(int(xpos),int(ypos))
					dnorm=(int(np.real(complex_increment*W/2)),int(np.imag(complex_increment*H/2)))
					dcentre=(dhead[0]-dnorm[0],dhead[1]-dnorm[1])
					
					pygame.draw.circle(surface2, ((0,100,100)),dcentre,int(mag*W/2),1)
					pygame.draw.circle(surface3, ((0,100,100)),dcentre,int(mag*W/2),1)
					pygame.draw.line(surface2,((0,100,100)),dcentre,dhead,1)
					pygame.draw.line(surface3,((0,100,100)),dcentre,dhead,1)
				
			pointlist.append(dhead)
				
			pygame.draw.circle(surface1,col, dhead,3,0)
			if len(pointlist)>=2:
				pygame.draw.lines(surface2,((255,255,255)),False,pointlist,width=1)
				pygame.draw.lines(surface4,((255,255,255)),False,pointlist,width=1)
			
			screen.blit(surface2,(W,0))	
			
			
			pygame.display.update()
			surface2=surface4
			
			for event in pygame.event.get():
				if event.type==pygame.QUIT:
					pygame.quit()
				if event.type==pygame.MOUSEBUTTONDOWN:
					
					drawing=False
					
			tm.sleep(0.01)
			
		tm.sleep(1)
		#screen.blit(surface4,(W,0))	
		#pygame.display.update()
		surface4=pygame.Surface((W,H))#copy drawing
		#wait for key press
		waiting=True		
		while waiting and drawing:
				
			for event in pygame.event.get():
				if event.type==pygame.QUIT:
					pygame.quit()
				if event.type==pygame.KEYDOWN:
					waiting=False


"""
fig,axs=plt.subplots(2)
axs[0].plot(t,x)
axs[1].plot(Xi,np.real(X))
axs[1].plot(Xi,np.imag(X))

plt.show()"""
