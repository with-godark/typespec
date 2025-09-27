import {createTypeSpecLibrary} from "@typespec/compiler";

export const $lib = createTypeSpecLibrary({
    name: "myLibrary",
    diagnostics: {},
} as const);

export const { reportDiagnostic, createDiagnostic } = $lib;