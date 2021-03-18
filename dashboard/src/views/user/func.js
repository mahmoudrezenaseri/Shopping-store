import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const validateDateEntry = (dateFrom, dateTo) => {
    let from = null, to = null;

    if (dateFrom != null && dateFrom.isValid()) {
        from = dateFrom.clone().format('jYYYY/jMM/jDD')
    }

    if (dateTo != null && dateTo.isValid()) {
        to = dateTo.clone().format('jYYYY/jMM/jDD')
    }

    if (from != null && to != null) {
        if (from > to) {
            toast.error("در وارد کردن بازه تاریخی دقت فرمایید!")
            return false;
        }
    }

    return true
}