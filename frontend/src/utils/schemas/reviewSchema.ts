import * as yup from 'yup';

export const reviewSchema = yup.object().shape({
    tournament: yup.string().required('Tournament is required'),
    reviewer: yup.object().shape({
        id: yup.string().required('Reviewer ID is required'),
        username: yup.string().required('Reviewer username is required')
    }).required('Reviewer is required'),
    ratings: yup.object().shape({
        overall: yup.number().min(1).max(5).required('Overall rating is required'),
        referee: yup.number().min(1).max(5).default(5),
        communication: yup.number().min(1).max(5).default(5),
        facilities: yup.number().min(1).max(5).default(5),
    }),
    subject: yup.string().min(5).max(50).required('Subject is required'),
    comment: yup.string().min(50).max(1000).required('Comment is required'),
});