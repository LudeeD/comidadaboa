export async function get() {
    //await timeout(3000);

    return {
        body: {
            "título": "Caril de Grão de Bico",
            "atributos": {
                "link": "/",
                "pessoas": 2,
                "Kcal": 0,
                "duração": 30
            },
            "ingredientes": [
                "grão de bico 500_g",
                "leite de coco 200_ml",
                "tomate 1_unidade",
                "limão 1_meia.unidade",
                "gengibre 1_q.b.",
                "cebola 1_meia.unidade",
                "alho 2_unidade",
                "sal 1_q.b.",
                "pimenta 1_q.b.",
                "caril em pó 1_q.b.",
                "coentros 1_q.b.",
            ],
            "instruções": [
                "Picar cebola, alho, gengibre e refogar",
                "Adicionar caril e pimenta, mexer",
                "Adicionar tomate picado(s / pele) e sumo do limão",
                "Refogar um pouco",
                "Adicionar o grão",
                "Adicionar o leite de coco, temperar com sal",
                "Deixar levantar fervura, baixar o lume e deixar 2 a 5 min",
                "Picar coentros para servir",
            ]
        },
    };
}