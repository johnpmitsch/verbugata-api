/* eslint-disable */
import type { Prisma, User, Language, Tense, Verb, Conjugation } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: never;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
    Language: {
        Name: "Language";
        Shape: Language;
        Include: Prisma.LanguageInclude;
        Select: Prisma.LanguageSelect;
        OrderBy: Prisma.LanguageOrderByWithRelationInput;
        WhereUnique: Prisma.LanguageWhereUniqueInput;
        Where: Prisma.LanguageWhereInput;
        RelationName: "tenses" | "verbs";
        ListRelations: "tenses" | "verbs";
        Relations: {
            tenses: {
                Shape: Tense[];
                Types: PrismaTypes["Tense"];
            };
            verbs: {
                Shape: Verb[];
                Types: PrismaTypes["Verb"];
            };
        };
    };
    Tense: {
        Name: "Tense";
        Shape: Tense;
        Include: Prisma.TenseInclude;
        Select: Prisma.TenseSelect;
        OrderBy: Prisma.TenseOrderByWithRelationInput;
        WhereUnique: Prisma.TenseWhereUniqueInput;
        Where: Prisma.TenseWhereInput;
        RelationName: "language" | "conjugations";
        ListRelations: "conjugations";
        Relations: {
            language: {
                Shape: Language;
                Types: PrismaTypes["Language"];
            };
            conjugations: {
                Shape: Conjugation[];
                Types: PrismaTypes["Conjugation"];
            };
        };
    };
    Verb: {
        Name: "Verb";
        Shape: Verb;
        Include: Prisma.VerbInclude;
        Select: Prisma.VerbSelect;
        OrderBy: Prisma.VerbOrderByWithRelationInput;
        WhereUnique: Prisma.VerbWhereUniqueInput;
        Where: Prisma.VerbWhereInput;
        RelationName: "language" | "conjugations";
        ListRelations: "conjugations";
        Relations: {
            language: {
                Shape: Language;
                Types: PrismaTypes["Language"];
            };
            conjugations: {
                Shape: Conjugation[];
                Types: PrismaTypes["Conjugation"];
            };
        };
    };
    Conjugation: {
        Name: "Conjugation";
        Shape: Conjugation;
        Include: Prisma.ConjugationInclude;
        Select: Prisma.ConjugationSelect;
        OrderBy: Prisma.ConjugationOrderByWithRelationInput;
        WhereUnique: Prisma.ConjugationWhereUniqueInput;
        Where: Prisma.ConjugationWhereInput;
        RelationName: "verb" | "tense";
        ListRelations: never;
        Relations: {
            verb: {
                Shape: Verb;
                Types: PrismaTypes["Verb"];
            };
            tense: {
                Shape: Tense;
                Types: PrismaTypes["Tense"];
            };
        };
    };
}