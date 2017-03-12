# Project Beacon
Interactive tool to help Dementia patients navigate their current environments

###Brief idea:
We have built a simple interface that provides catered reinforcement to a user, through intuitive action items/options.

The problem we are trying to solve is building location awareness and providing the user with relevant contextual data in an enclosed physical space, through the use of beacon technology. The goal is to help residents build a positive interaction with the system, such that if they enter an area where they are not sure either why they are there or what they came to do there, they are now provided with some guidance.

##Build: 
The system involves a stationary display connected to a BLE beacon (iPad Air for demo purposes) and personal BLE enabled devices. The interface was built using the Cordova (HTML, CSS, JS, JQuery) framework along with the Cordova Bluetooth plug-in. Future work would replace the iPad setup, with a display connected to an iBeacon and NFC enabled system, such as the Estimote Beacons.

##Team:
Will Mero, Front End Developer
Arel Roche, UX Developer
Matthew O'Neill, Back End Developer
Vanida Lim, Graphic Designer
Pavel Abramov, Full Stack

##Full Story:
The the challenge that we are trying to address using this platform is the problem of Location Awareness amongst Dementia patients. Dementia patients often find themselves in a situation where they are not sure why they entered a certain location or what task/goal they were trying to accomplish in doing so.

Our platform aims to provide a passive interactive tool situated in easily recognizable physical spaces, that can be activated based on a user's proximity to the system. The primary step here is design the interface in such a way that the user can build a positive association with the system, through the use of simple but distinguishable interaction elements and imagery. Once that association is achieved, the user is provided with a few simple views that helps them understand their current physical location and they options or activities that they would normally engage in in that space. The approach here is to not necessarily make them try to remember why they got here, but more so what they can do now that they are here. In addition to this, it ties into the user's routine in order to guide them what they should or could be doing next.