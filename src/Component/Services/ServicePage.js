import React from "react";
import { FormService } from "../Services";
import MainLayout from "../../Layout/MainLayout";
export const ServicePage = () => {
    return (
        <>
            <MainLayout>
                <section>
                    <FormService
                        KeyTitle={1}
                        KeyIsHot={0}
                    />
                </section>
            </MainLayout>

        </>
    );
};
