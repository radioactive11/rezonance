import pandas as pd
import numpy as np


def get_results(qry):
    """
    :param qry: part fo the song or artist to be searched for
    :return: a list of all relevent results
    """
    ids = pd.read_csv("data/id.csv")
    mask = ids["search"].str.contains(qry, regex=False, case=False)
    search_res = ids[mask]
    qry_res_name = []
    qry_res_id = []
    for i in range(len(search_res)):
        qry_res_name.append(search_res.iloc[i, 1] + " by " + search_res.iloc[i, 2])
        qry_res_id.append(search_res.iloc[i, 0])

    return qry_res_name, qry_res_id
