import * as yup from 'yup';

export const tournamentSchema = yup.object().shape({
    name: yup.string().required('Tournament name is required'),
    location: yup.object().shape({
        city: yup.string().required('City is required'),
        state: yup.string().required('State is required'),
    }),
    company: yup.object().shape({
        name: yup.string().required('Company name is required'),
        email: yup.string().email('Email address is invalid').required('Company email is required'),
    }),
    dates: yup.array().of(yup.date().required('Date is required')).min(1, 'At least one date is required'),
    description: yup.string().required('Description is required'),
    minimum_games: yup.number().required('Minimum games is required').min(1, 'Minimum games must be at least 1').max(5, 'Minimum games must be at most 5'),
    level_of_play: yup.array().of(yup.string()).min(1, 'At least one level of play is required'),
    age_groups: yup.array().of(yup.string()).min(1, 'At least one age group is required'),
    gender: yup.string().required('Gender is required'),
    hardware: yup.object().shape({
        first_place: yup.string().required('First place hardware is required'),
        second_place: yup.string().required('Second place hardware is required'),
    }),
    discounts: yup.object().shape({
        multi_team: yup.boolean(),
        early_bird: yup.string(),
        other: yup.string(),
    }),
    details: yup.object().shape({
        usa_sanctioned: yup.boolean(),
        stay_and_play: yup.boolean(),
        extended_checkout: yup.boolean(),
    }),
});