import { ReactElement } from "react";
import Footer_1, { FooterCode_1, FooterElement_1 } from "./Footer/Footer_1";
import Footer_2, { FooterCode_2, FooterElement_2 } from "./Footer/Footer_2";

import Header_1, { HeaderCode_1, HeaderElement_1 } from "./Header/Header_1";
import Header_2, { HeaderCode_2, HeaderElement_2 } from "./Header/Header_2";
import Header_3, { HeaderCode_3, HeaderElement_3 } from "./Header/Header_3";
import Hero_1, { HeroCode_1, HeroElement_1 } from "./Hero/Hero_1";
import SignIn_1, { SignInCode_1, SignInElement_1 } from "./SignIn/SignIn_1";
import SignIn_2, { SignInCode_2, SignInElement_2 } from "./SignIn/SignIn_2";

export interface Variants {
  name: string;
  id: number;
  component: React.FC;
  code: string;
  element: ReactElement;
}

export interface Components {
  name: string;
  variants: Array<Variants["id"]>;
}

export const components: Components[] = [
  {
    name: "Header",
    variants: [1, 2, 3],
  },
  {
    name: "Footer",
    variants: [4, 5],
  },
  {
    name: "Hero",
    variants: [6],
  },
  {
    name: "SignIn",
    variants: [8, 7],
  },
];

export const variants: Variants[] = [
  {
    name: "Header Default",
    id: 1,
    component: Header_1,
    code: HeaderCode_1,
    element: HeaderElement_1,
  },
  {
    name: "Header with Fields (On This Site)",
    id: 2,
    component: Header_2,
    code: HeaderCode_2,
    element: HeaderElement_2,
  },
  {
    name: "Header with Search",
    id: 3,
    component: Header_3,
    code: HeaderCode_3,
    element: HeaderElement_3,
  },
  {
    name: "Footer Default",
    id: 4,
    component: Footer_1,
    code: FooterCode_1,
    element: FooterElement_1,
  },
  {
    name: "Footer Flexed",
    id: 5,
    component: Footer_2,
    code: FooterCode_2,
    element: FooterElement_2,
  },
  {
    name: "Hero Default",
    id: 6,
    component: Hero_1,
    code: HeroCode_1,
    element: HeroElement_1,
  },
  {
    name: "Sign In Flexed",
    id: 7,
    component: SignIn_1,
    code: SignInCode_1,
    element: SignInElement_1,
  },
  {
    name: "Sign In Default",
    id: 8,
    component: SignIn_2,
    code: SignInCode_2,
    element: SignInElement_2,
  },
];

// Function that returns the component from the component name
export function FindComponentData(componentName: string): Components | null {
  var ReturnVal: Components | null = null;
  for (var i = 0; i <= components.length - 1; i++) {
    if (components[i].name === componentName) {
      ReturnVal = components[i];
    }
  }
  return ReturnVal;
}

// Function that return the data of the variants from the array - Components.variant
export const FindVariantsOfAComponent = (variantsArray: Array<number>) => {
  var ReturnArray: Array<Variants> = [];
  for (var arr = 0; arr <= variantsArray.length - 1; arr++) {
    for (var i = 0; i <= variants.length - 1; i++) {
      if (variants[i].id === variantsArray[arr]) {
        ReturnArray.push(variants[i]);
      }
    }
  }
  return ReturnArray;
};

//Function that returns a single Variant based on the Id

export const FindVariantFromId = (variantId: number) => {
  // var ReturnVariant: Variants | null = null;
  for (var i = 0; i <= variants.length - 1; i++) {
    if (variants[i].id === variantId) {
      return variants[i];
    }
  }
  return null;
};
