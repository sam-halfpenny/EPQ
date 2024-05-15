# Aims and Project Description

The main aim of this project is to render a black hole to a degree of accuracy without using mainstream rendering engines. Therefore the raytracing algorithm is written in vanilla python and is not particularly efficient. 

The physics and Mathematics behind the project is covered in the Rendering_a_black_hole.pdf
# Structure

rtx.py - performs the majority of the rendering process
wav2rgb.py - calculates Redshift and generates spectra
rtx.js and rtx.html - redundant but used to perform the same tasks as rtx.py
test.py - used mainly for checking seperate modules and their efficacy
Rendering_a_black_hole.pdf - details the Mathematics behind the project
notifyMe.py and notifyMe.js - send me an email when a render has been completed via a Google cloud server

# Improvement and Developement

At the moment the program calculates the path light takes numerically. To improve on the accuracy of this we could calculate how light would interact with the black hole by finding analytic solutions to the Geodesic equations surrounding the Swarzschild solution to Einsteins equations of General Relativity.
