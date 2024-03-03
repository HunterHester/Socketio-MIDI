<script>

    import { io } from 'socket.io-client'

    export default {

        data(){
            return {
                midiIn : []
            }
        },
        mounted(){

            console.log("[midi box] mounted!")
            function connect() {
                navigator.requestMIDIAccess()
                .then(
                    (midi) => midiReady(midi),
                    (err) => console.log('Something went wrong', err));
                }

            function midiReady(midi) {
                // Also react to device changes.
                midi.addEventListener('statechange', (event) => console.log("state change"));
                
                var inputs = midi.inputs.values()
                for (const input in inputs)
                {
                    console.log(input)
                    input.addEventListener('midimessage', (msg)=>{
                        console.log(msg)
                    });
                }
            }

            connect()



            this.socket = io()

            this.socket.on('midi event', (message)=>{
                console.log("hi")
            } )

        },
        methods: {
            sendMidiEvent(){
                this.socket.emit('midi event', 'something')
            },
            setupMidi(midi_object)
            {

                function onMIDIMessage(event) {
                    let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data.length} bytes]: `;
                    for (const character of event.data) {
                        str += `0x${character.toString(16)} `;
                    }
                    console.log(str);
                }
                console.log("MIDI ready!");
                this.midi = midi_object

                this.midi.outputs.forEach((entry)=>{
                    entry.open()
                })

                for (const entry of this.midi.inputs){
                    console.log(entry)

                    entry.onmidimessage = onMIDIMessage;
                }
            }
        }

    }

</script>


<template>

    <button @click="()=>{sendMidiEvent()}">send a midi</button>

</template>