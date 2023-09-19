import React, { useEffect, useState } from "react";
import { FormAboutUs } from "./FormAboutUs";
import MainLayout from "../../Layout/MainLayout";
export const AboutUsPage = () => {
 
    return (
        <MainLayout>
            <section>
                <FormAboutUs
                    KeyMap={1}
                    KeyTitle={1}
                />
            </section>
        </MainLayout>
    );
};
