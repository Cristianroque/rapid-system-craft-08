
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/types/database';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching projects from Supabase...');
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Projects fetched successfully:', data);
      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar projetos');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('Creating project:', projectData);
      
      const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();

      if (error) {
        console.error('Error creating project:', error);
        throw error;
      }
      
      console.log('Project created successfully:', data);
      setProjects(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error in createProject:', err);
      throw new Error(err instanceof Error ? err.message : 'Erro ao criar projeto');
    }
  };

  const updateProject = async (id: string, projectData: Partial<Project>) => {
    try {
      console.log('Updating project:', id, projectData);
      
      const { data, error } = await supabase
        .from('projects')
        .update({ ...projectData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating project:', error);
        throw error;
      }
      
      console.log('Project updated successfully:', data);
      setProjects(prev => prev.map(p => p.id === id ? data : p));
      return data;
    } catch (err) {
      console.error('Error in updateProject:', err);
      throw new Error(err instanceof Error ? err.message : 'Erro ao atualizar projeto');
    }
  };

  const deleteProject = async (id: string) => {
    try {
      console.log('Deleting project:', id);
      
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting project:', error);
        throw error;
      }
      
      console.log('Project deleted successfully');
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error in deleteProject:', err);
      throw new Error(err instanceof Error ? err.message : 'Erro ao excluir projeto');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject
  };
};
