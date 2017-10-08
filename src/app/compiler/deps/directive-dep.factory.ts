import { IDep } from '../dependencies.interfaces';
import { ComponentHelper } from './helpers/component-helper';
import { NsModuleCache } from './helpers/symbol-helper';

export class DirectiveDepFactory {
    constructor(private helper: ComponentHelper) {

    }

    public create(file: any, srcFile: any, name: any, props: any, IO: any): IDirectiveDep {
        let directiveDeps: IDirectiveDep = {
            name,
            id: 'directive-' + name + '-' + Date.now(),
            file: file,
            type: 'directive',
            description: IO.description,
            sourceCode: srcFile.getText(),
            selector: this.helper.getComponentSelector(props),
            providers: this.helper.getComponentProviders(props),

            inputsClass: IO.inputs,
            outputsClass: IO.outputs,

            hostBindings: IO.hostBindings,
            hostListeners: IO.hostListeners,

            propertiesClass: IO.properties,
            methodsClass: IO.methods,
            exampleUrls: this.helper.getComponentExampleUrls(srcFile.getText())
        };
        if (IO.jsdoctags && IO.jsdoctags.length > 0) {
            directiveDeps.jsdoctags = IO.jsdoctags[0].tags;
        }
        if (IO.implements && IO.implements.length > 0) {
            directiveDeps.implements = IO.implements;
        }
        if (IO.constructor) {
            directiveDeps.constructorObj = IO.constructor;
        }
        return directiveDeps;
    }
}

export interface IDirectiveDep extends IDep {
    file: any;
    description: string;
    sourceCode: string;

    selector: string;
    providers: Array<any>;

    inputsClass: any;
    outputsClass: any;

    hostBindings: any;
    hostListeners: any;

    propertiesClass: any;
    methodsClass: any;
    exampleUrls: Array<string>;

    constructorObj?: Object;
    jsdoctags?: Array<string>;
    implements?: any;
}