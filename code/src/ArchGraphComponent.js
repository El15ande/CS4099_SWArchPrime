import * as JOINT from 'jointjs';
import ArchGraphInterface from './ArchGraphInterface';

export default class ArchGraphComponent {
    constructor(data, intera) {
        this.jointComponent = new JOINT.shapes.standard.Rectangle({
            attrs: {
                body: {
                    'stroke': intera ? '#9FA8DA' : '#333333',
                    'fill': intera ? '#9FA8DA' : '#FFFFFF',
                    'fill-opacity': intera ? 0.05 : 1
                },
                label: intera 
                    ? {}
                    : {
                        text: data.cpname ? data.cpname : null,
                        'font-size': this._getFontSize(data.canvas.width, data.canvas.height, data.cpname)
                    }
            },

            position: {
                x: data.canvas.x,
                y: data.canvas.y
            },

            size: {
                width: data.canvas.width,
                height: data.canvas.height
            },

            ports: {
                groups: {
                    'Left': {
                        position: { name: 'left' },
                        label: {
                            position: { 
                                name: intera ? 'left' : 'bottom',
                                args: { y: intera ? 10 : 25 }
                            }
                        },
                        attrs: {
                            '.joint-port-body': { magnet: true },
                            '.joint-port-label': { fontSize: intera ? 20 : 12 }
                        }
                    },
                    'Right': {
                        position: { name: 'right' },
                        label: {
                            position: { 
                                name: intera ? 'right' : 'bottom',
                                args: { y: intera ? 10 : 25 }
                            }
                        },
                        attrs: {
                            '.joint-port-body': { magnet: true },
                            '.joint-port-label': { fontSize: intera ? 20 : 12 }
                        }
                    },
                    'Top': {
                        position: { name: 'top' },
                        label: {
                            position: { 
                                name: 'top',
                                args: {
                                    x: 8, 
                                    y: intera ? -20 : 20 
                                } 
                            }
                        },
                        attrs: {
                            '.joint-port-body': { magnet: true },
                            '.joint-port-label': { fontSize: intera ? 20 : 12 }
                        }
                    },
                    'Bottom': {
                        position: { name: 'bottom' },
                        label: {
                            position: { 
                                name: 'bottom',
                                args: {
                                    x: 8, 
                                    y: intera ? 20 : -20 
                                }
                            }
                        },
                        attrs: {
                            '.joint-port-body': { magnet: true },
                            '.joint-port-label': { fontSize: intera ? 20 : 12 }
                        }
                    }
                }
            },

            cpid: intera ? 'INTERA' : (data.cpid ? data.cpid : -1),
            cpname: intera ? intera : (data.cpname ? data.cpname : ''),
        });
        this.jointInterfaces = [];

        data.cpintf.map((intf) => { 
            let port = new ArchGraphInterface(intf, intera);
            this.jointInterfaces.push(port);
            this.jointComponent.addPort(port.jointPort);
        });
    }

    // Add the component to paper;
    //  paper: joint paper;
    addTo = function(paper) {
        this.jointComponent.addTo(paper);
        this.jointComponent.attributes.z = 100 + this.jointComponent.attributes.cpid;
    }
    
    // Set component font size;
    //  w: width;
    //  h: height;
    //  str: string to be printed on component;
    _getFontSize = function(w, h, str) {
        if(h <= 20) return 12.5;
        if(w/str.length <= 10.0) return w/str.length * 2;

        return 20;
    }
}