// Default cases data
const DEFAULT_CASES = [
    {
        id: 'sindona-paraiso',
        title: 'Sindona Paraíso',
        shortDescription: 'Acompanhamento transparente de obra residencial com documentação visual completa e comparativo promessa vs realidade.',
        tags: ['Documentação', 'Transparência', 'Web'],
        status: 'concluido',
        coverImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=500&fit=crop',
        subtitle: 'Transparência e documentação visual em obra residencial',
        sections: {
            context: 'Projeto de acompanhamento de obra residencial com foco em transparência e documentação visual. O objetivo era criar um registro completo do processo construtivo.',
            problem: 'Dificuldade em acompanhar o progresso real da obra e comparar com o prometido pela construtora. Falta de transparência e documentação adequada.',
            objective: 'Criar uma plataforma de documentação visual que permita comparar promessas com a realidade da construção, facilitando o acompanhamento e comunicação.',
            process: 'Desenvolvimento de sistema de comparação visual, organização de documentos, criação de timeline interativa e implementação de galeria fotográfica cronológica.',
            solution: 'Site responsivo com galeria de fotos, comparativo lado a lado e documentação completa do processo. Interface intuitiva para navegação temporal.',
            result: 'Transparência total no acompanhamento da obra, facilitando a comunicação com a construtora e criando um registro histórico completo do projeto.'
        },
        gallery: []
    },
    {
        id: 'fadelito-flow',
        title: 'Fadelito Flow',
        shortDescription: 'Redesign completo do fluxo de compra, focando em conversão e experiência do usuário.',
        tags: ['UX/UI', 'Research', 'Prototyping'],
        status: 'concluido',
        coverImage: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=500&fit=crop',
        subtitle: 'Otimização de checkout para e-commerce de moda',
        sections: {
            context: 'E-commerce de moda feminina com baixa taxa de conversão no checkout. A empresa identificou que muitos usuários abandonavam o carrinho antes de finalizar a compra.',
            problem: 'Fluxo de compra confuso, muitos passos desnecessários e alta taxa de abandono de carrinho (68%). Interface pouco intuitiva e falta de indicadores de progresso.',
            objective: 'Simplificar o processo de checkout e aumentar a taxa de conversão, reduzindo o abandono de carrinho e melhorando a experiência do usuário.',
            process: 'Análise de métricas, testes de usabilidade com usuários reais, mapeamento de jornada, prototipagem iterativa e validação contínua com A/B testing.',
            solution: 'Novo fluxo simplificado com menos etapas (de 5 para 3 passos), indicadores de progresso claros, opções de pagamento otimizadas e checkout expresso para usuários cadastrados.',
            result: 'Aumento de 35% na taxa de conversão e redução de 50% no abandono de carrinho. ROI positivo em 2 meses após implementação.'
        },
        gallery: []
    },
    {
        id: 'mape',
        title: 'MAPE',
        shortDescription: 'Sistema de gestão educacional com interface intuitiva para professores e alunos.',
        tags: ['Product Design', 'UX Research', 'Dashboard'],
        status: 'andamento',
        coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
        subtitle: 'Plataforma educacional moderna e intuitiva',
        sections: {
            context: 'Plataforma educacional para gestão de cursos, alunos e conteúdo pedagógico. Utilizada por mais de 50 instituições de ensino.',
            problem: 'Sistema legado com interface complexa e baixa adoção por parte dos professores. Curva de aprendizado alta e resistência à mudança.',
            objective: 'Criar uma experiência intuitiva que facilite o trabalho dos educadores, reduzindo o tempo de treinamento e aumentando a adoção da plataforma.',
            process: 'Pesquisa com usuários (professores e alunos), mapeamento de jornadas, criação de design system, prototipagem e testes contínuos de usabilidade.',
            solution: 'Dashboard moderno com navegação simplificada, ferramentas de gestão integradas, design system consistente e onboarding interativo.',
            result: 'Projeto em desenvolvimento com validações positivas nos testes de usabilidade. Redução de 60% no tempo de treinamento de novos usuários.'
        },
        gallery: []
    },
    {
        id: 'classificados-memorial',
        title: 'Classificados Memorial',
        shortDescription: 'Plataforma de classificados moderna com foco em usabilidade e acessibilidade.',
        tags: ['UX/UI', 'Front-end', 'Design System', 'Voluntário'],
        status: 'concluido',
        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
        subtitle: 'Modernização de plataforma comunitária (projeto voluntário)',
        sections: {
            context: 'Projeto voluntário para modernizar plataforma de classificados comunitários. Serviço utilizado por milhares de pessoas da comunidade local.',
            problem: 'Interface desatualizada, difícil navegação e baixa acessibilidade. Muitos usuários idosos tinham dificuldade em usar a plataforma.',
            objective: 'Criar uma experiência moderna, acessível e fácil de usar para todos os públicos, incluindo pessoas com diferentes níveis de familiaridade com tecnologia.',
            process: 'Redesign completo da interface, implementação de design system, desenvolvimento front-end com foco em acessibilidade (WCAG 2.1) e testes com usuários reais.',
            solution: 'Plataforma responsiva com busca otimizada, filtros intuitivos, navegação simplificada, alto contraste e suporte a leitores de tela.',
            result: 'Aumento significativo no engajamento (+45%), feedback positivo da comunidade e reconhecimento por acessibilidade. Projeto premiado localmente.'
        },
        gallery: []
    }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DEFAULT_CASES };
}
